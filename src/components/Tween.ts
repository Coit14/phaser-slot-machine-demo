import Phaser from 'phaser';

import {
  REEL_REPEAT_BY_COLUMN,
  REEL_SCROLL_DURATION_MS,
  REEL_SYMBOL_HEIGHT,
} from '../game/reels/reelConstants';
import type { Game } from '../scenes';

export class Tween {
  columnTween1;
  columnTween2;
  columnTween3;
  columnTween4;
  columnTween5;

  constructor(scene: Game) {
    this.columnTween1 = scene.tweens.add({
      // https://github.com/phaserjs/phaser/issues/6539#issuecomment-1625628891
      persist: true,
      targets: scene.container1,
      props: {
        y: {
          value: `+=${REEL_SYMBOL_HEIGHT}`,
          duration: REEL_SCROLL_DURATION_MS,
        },
      },
      repeat: REEL_REPEAT_BY_COLUMN[0],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + REEL_SYMBOL_HEIGHT, true);
        target.first.y = target.last.y - REEL_SYMBOL_HEIGHT;
        const symbols = target.first
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${REEL_SYMBOL_HEIGHT}`,
              duration: REEL_SCROLL_DURATION_MS * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - REEL_SYMBOL_HEIGHT, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + REEL_SYMBOL_HEIGHT;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            const scene = targets[0].scene as Game;
            if (scene.audioMusicName === 'btn_music.png') {
              scene.audio.audioReelStop.play();
            }
          },
        });
      },
    });

    this.columnTween2 = scene.tweens.add({
      persist: true,
      targets: scene.container2,
      props: {
        y: {
          value: `+=${REEL_SYMBOL_HEIGHT}`,
          duration: REEL_SCROLL_DURATION_MS,
        },
      },
      repeat: REEL_REPEAT_BY_COLUMN[1],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + REEL_SYMBOL_HEIGHT, true);
        target.first.y = target.last.y - REEL_SYMBOL_HEIGHT;
        const symbols = target.first;
        symbols
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${REEL_SYMBOL_HEIGHT}`,
              duration: REEL_SCROLL_DURATION_MS * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - REEL_SYMBOL_HEIGHT, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + REEL_SYMBOL_HEIGHT;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            const scene = targets[0].scene as Game;
            if (scene.audioMusicName === 'btn_music.png') {
              scene.audio.audioReelStop.play();
            }
          },
        });
      },
    });

    this.columnTween3 = scene.tweens.add({
      persist: true,
      targets: scene.container3,
      props: {
        y: {
          value: `+=${REEL_SYMBOL_HEIGHT}`,
          duration: REEL_SCROLL_DURATION_MS,
        },
      },
      repeat: REEL_REPEAT_BY_COLUMN[2],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + REEL_SYMBOL_HEIGHT, true);
        target.first.y = target.last.y - REEL_SYMBOL_HEIGHT;
        const symbols = target.first;
        symbols
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${REEL_SYMBOL_HEIGHT}`,
              duration: REEL_SCROLL_DURATION_MS * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - REEL_SYMBOL_HEIGHT, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + REEL_SYMBOL_HEIGHT;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            const scene = targets[0].scene as Game;
            if (scene.audioMusicName === 'btn_music.png') {
              scene.audio.audioReelStop.play();
            }
          },
        });
      },
    });

    this.columnTween4 = scene.tweens.add({
      persist: true,
      targets: scene.container4,
      props: {
        y: {
          value: `+=${REEL_SYMBOL_HEIGHT}`,
          duration: REEL_SCROLL_DURATION_MS,
        },
      },
      repeat: REEL_REPEAT_BY_COLUMN[3],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + REEL_SYMBOL_HEIGHT, true);
        target.first.y = target.last.y - REEL_SYMBOL_HEIGHT;
        const symbols = target.first;
        symbols
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${REEL_SYMBOL_HEIGHT}`,
              duration: REEL_SCROLL_DURATION_MS * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - REEL_SYMBOL_HEIGHT, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + REEL_SYMBOL_HEIGHT;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            const scene = targets[0].scene as Game;
            if (scene.audioMusicName === 'btn_music.png') {
              scene.audio.audioReelStop.play();
            }
          },
        });
      },
    });

    this.columnTween5 = scene.tweens.add({
      persist: true,
      targets: scene.container5,
      props: {
        y: {
          value: `+=${REEL_SYMBOL_HEIGHT}`,
          duration: REEL_SCROLL_DURATION_MS,
        },
      },
      repeat: REEL_REPEAT_BY_COLUMN[4],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + REEL_SYMBOL_HEIGHT, true);
        target.first.y = target.last.y - REEL_SYMBOL_HEIGHT;
        const symbols = target.first;
        symbols
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${REEL_SYMBOL_HEIGHT}`,
              duration: REEL_SCROLL_DURATION_MS * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - REEL_SYMBOL_HEIGHT, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + REEL_SYMBOL_HEIGHT;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            const scene = targets[0].scene as Game;
            if (scene.audioMusicName === 'btn_music.png') {
              scene.audio.audioReelStop.play();
              scene.audio.audioReels.stop();
            }
            scene.handleReelsFinished();
          },
        });
      },
    });
  }
}
