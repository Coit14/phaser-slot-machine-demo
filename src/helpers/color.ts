import type { Game } from '../scenes';

/** Dim non-essential controls while reels spin. */
export function setSpinningTint(scene: Game) {
  scene.baseSpin.setTint(0xa09d9d);
  scene.btnMusic.setTint(0xa09d9d);
  scene.btnSound.setTint(0xa09d9d);
}
