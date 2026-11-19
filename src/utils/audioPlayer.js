// Romantic Audio Player with Rio Roma song & fallback synth

class RomanticMusicPlayer {
  constructor() {
    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';
    this.audioElement.loop = true;
    
    // Primary audio track
    this.candidateSources = [
      '/media/song.mp3',
      '/media/Me cambiaste la vida - Rio Roma.mp3',
      '/media/Me cambiaste la vida - Rio Roma.mpeg',
      '/song.mp3'
    ];
    this.currentSourceIndex = 0;
    this.audioElement.src = this.candidateSources[0];

    this.isPlaying = false;
    this.synthActive = false;
    this.synthContext = null;
    this.synthTimer = null;
    this.subscribers = [];

    this.audioElement.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('error', (e) => {
      console.warn('Audio error with source:', this.audioElement.src, e);
      // Try next candidate source if available
      this.currentSourceIndex++;
      if (this.currentSourceIndex < this.candidateSources.length) {
        this.audioElement.src = this.candidateSources[this.currentSourceIndex];
        if (this.isPlaying) {
          this.audioElement.play().catch(() => this.startSynth());
        }
      } else if (this.isPlaying) {
        // Fallback to synth if no files load
        this.startSynth();
      }
    });

    this.audioElement.addEventListener('play', () => {
      this.stopSynth();
      this.isPlaying = true;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.isPlaying));
  }

  async toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
    return this.isPlaying;
  }

  restart() {
    try {
      this.audioElement.currentTime = 0;
    } catch {
      // ignore
    }
    this.play();
  }

  async play() {
    this.isPlaying = true;
    this.notify();

    try {
      if (this.audioElement.paused) {
        await this.audioElement.play();
      }
    } catch (err) {
      console.warn('Could not auto-play audio element, using synth fallback:', err);
      this.startSynth();
    }
  }

  pause() {
    this.isPlaying = false;
    this.audioElement.pause();
    this.stopSynth();
    this.notify();
  }

  startSynth() {
    if (this.synthActive) return;
    this.synthActive = true;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.synthContext = new AudioCtx();

      const notes = [
        349.23, 440.00, 523.25, 659.25, 523.25, 440.00, 
        392.00, 329.63, 349.23, 392.00, 440.00, 523.25
      ];

      let noteIndex = 0;
      const playNextNote = () => {
        if (!this.synthActive || !this.synthContext) return;

        if (this.synthContext.state === 'suspended') {
          this.synthContext.resume();
        }

        const now = this.synthContext.currentTime;
        const osc = this.synthContext.createOscillator();
        const gain = this.synthContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIndex], now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.synthContext.destination);

        osc.start(now);
        osc.stop(now + 1.25);

        noteIndex = (noteIndex + 1) % notes.length;
        this.synthTimer = setTimeout(playNextNote, 420);
      };

      playNextNote();
    } catch {
      // Ignore
    }
  }

  stopSynth() {
    this.synthActive = false;
    if (this.synthTimer) {
      clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
    if (this.synthContext) {
      try {
        this.synthContext.close();
      } catch {
        // ignore
      }
      this.synthContext = null;
    }
  }
}

export const musicPlayer = new RomanticMusicPlayer();
