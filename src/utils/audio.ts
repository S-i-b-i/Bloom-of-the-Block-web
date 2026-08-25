// Generative Web Audio synthesizer for UI interaction sound effects

class StudioSoundscape {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      // Play ascending welcome arpeggio feedback when enabled
      this.playArpeggio([523.25, 659.25, 783.99, 1046.50]); // C5 - E5 - G5 - C6
    } else {
      // Soft descending click tone when muted
      this.playChime(300, 'sine', 0.15, 0.1);
    }

    return !this.isMuted;
  }

  public playChime(freq: number = 520, type: OscillatorType = 'sine', duration: number = 0.2, volume: number = 0.15) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context silenced or blocked
    }
  }

  public playArpeggio(notes: number[]) {
    if (this.isMuted || !this.ctx) return;
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playChime(freq, 'sine', 0.2, 0.12);
      }, index * 70);
    });
  }

  public playClick() {
    this.playChime(700, 'sine', 0.08, 0.08);
  }

  public playAddCart() {
    this.playArpeggio([440, 554.37, 659.25, 880]); // A major celebratory chord
  }

  public playRemoveCart() {
    this.playChime(350, 'triangle', 0.12, 0.1);
  }

  public isAudioActive(): boolean {
    return !this.isMuted;
  }
}

export const soundscape = new StudioSoundscape();


