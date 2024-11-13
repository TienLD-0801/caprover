import audioIn from '@/assets/sound/audioIn.mp3';

export class SoundManager {
  private audioIn: HTMLAudioElement | null = null;
  private audioOut: HTMLAudioElement | null = null;

  constructor() {
    if (import.meta.client) {
      this.audioIn = new Audio(audioIn);
      this.audioOut = new Audio('https://dsp-studio.ro/fast-swipe.mp3');
    }
  }

  playOpenSound() {
    if (this.audioIn) {
      this.playSound(this.audioIn);
    }
  }

  playCloseSound() {
    if (this.audioOut) {
      this.playSound(this.audioOut);
    }
  }

  playSound(audio: HTMLAudioElement) {
    audio.volume = 0.75;
    audio.pause();
    audio.currentTime = 0;
    audio
      .play()
      .catch((err: any) => console.error('Audio playback failed:', err));
  }
}
