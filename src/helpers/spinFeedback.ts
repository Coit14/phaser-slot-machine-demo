import type { Game } from '../scenes';

/** Audio feedback when a spin starts (no credits / economy). */
export function playSpinStartAudio(scene: Game) {
  scene.audioPlayButton();
  if (scene.audioMusicName === 'btn_music.png') {
    scene.audio.audioWin.stop();
    scene.audio.audioReels.play();
  }
}
