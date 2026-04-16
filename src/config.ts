import Phaser from 'phaser';

import { Boot, Game, Preload } from './scenes';

type Config = Phaser.Types.Core.GameConfig & { width: number; height: number };

const config: Config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#0d0d0f',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  fps: {
    min: 30,
    target: 60,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Boot, Game],
};

export default config;
