import Phaser from 'phaser';
import { Fragment, render, Sprite, Text } from 'phaser-jsx';

import type { DispenseAdapter } from '../adapters/DispenseAdapter';
import { MockDispenseAdapter, MockPaymentAdapter } from '../adapters/mocks';
import { Audio } from '../components/Audio';
import { BaseSpin } from '../components/BaseSpin';
import { Container } from '../components/Container';
import { Time } from '../components/Time';
import { Tween } from '../components/Tween';
import config from '../config';
import { LocalStorageKey } from '../constants';
import { BeerSpinState, GameStateMachine } from '../game/state';

const CONTAINERS_COUNT = 5;

/** Main play / kiosk scene (legacy key: `Game`). */
export class Game extends Phaser.Scene {
  audioMusicName = '';
  audio!: Audio;
  audioSoundName = '';
  baseSpin!: Phaser.GameObjects.Sprite;
  baseSpinTweens!: Tween;
  btnMusic!: Phaser.GameObjects.Sprite;
  btnSound!: Phaser.GameObjects.Sprite;
  container1!: Phaser.GameObjects.Container;
  container2!: Phaser.GameObjects.Container;
  container3!: Phaser.GameObjects.Container;
  container4!: Phaser.GameObjects.Container;
  container5!: Phaser.GameObjects.Container;
  flowLabel!: Phaser.GameObjects.Text;

  private fsm!: GameStateMachine;
  private readonly rainbowPalette = Phaser.Display.Color.HSVColorWheel();
  private rainbowIndex = 0;

  /** Arrow so `this` stays the scene when Phaser calls this from DynamicBitmapText (not as a method). */
  readonly textCallback = (
    display: Phaser.Types.GameObjects.BitmapText.DisplayCallbackConfig,
  ) => {
    display.tint.topLeft =
      this.rainbowPalette[Math.floor(this.rainbowIndex)].color;
    display.tint.topRight =
      this.rainbowPalette[359 - Math.floor(this.rainbowIndex)].color;
    display.tint.bottomLeft =
      this.rainbowPalette[359 - Math.floor(this.rainbowIndex)].color;
    display.tint.bottomRight =
      this.rainbowPalette[Math.floor(this.rainbowIndex)].color;

    this.rainbowIndex += 0.05;

    if (this.rainbowIndex >= this.rainbowPalette.length) {
      this.rainbowIndex = 0;
    }

    return display;
  };

  constructor() {
    super({ key: 'Game' });
  }

  create() {
    let fsm = this.game.registry.get('beerSpinFsm');
    if (!(fsm instanceof GameStateMachine)) {
      // Dev / HMR: Boot may not have run — bootstrap so the scene still mounts.
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn(
          '[Beer Spin] FSM missing from registry; applying dev bootstrap.',
        );
      }
      fsm = new GameStateMachine();
      this.game.registry.set('beerSpinFsm', fsm);
      if (!this.game.registry.get('paymentAdapter')) {
        this.game.registry.set('paymentAdapter', new MockPaymentAdapter());
      }
      if (!this.game.registry.get('dispenseAdapter')) {
        this.game.registry.set('dispenseAdapter', new MockDispenseAdapter());
      }
      fsm.dispatch({ type: 'ATTRACT_PLAY_TAP' });
      fsm.dispatch({ type: 'MOCK_PAYMENT_OK' });
    }
    this.fsm = fsm;

    this.audio = new Audio(this);

    render(
      <Fragment>
        <Sprite
          x={config.width / 2}
          y={config.height / 2}
          texture="background"
          frame="bg.jpg"
        />

        {Array(CONTAINERS_COUNT)
          .fill(null)
          .map((_, index) => (
            <Container
              x={config.width - 940 + index * 150}
              y={config.height - 90}
              ref={(gameObject) =>
                // @ts-expect-error dynamic container ref
                (this[`container${index + 1}`] = gameObject)
              }
            />
          ))}

        <Sprite
          x={config.width / 2}
          y={config.height / 2}
          texture="background"
          frame="machine.png"
        />

        <Text
          x={config.width / 2}
          y={36}
          originX={0.5}
          text={this.formatFlowLabel()}
          style={{
            color: '#dddddd',
            font: '22px "PT Serif"',
          }}
          ref={(gameObject) => {
            this.flowLabel = gameObject;
          }}
        />

        <Time />

        <Sprite
          x={config.width - 310}
          y={config.height - 675}
          texture="sound"
          frame={
            localStorage.getItem(LocalStorageKey.Music) ?? 'btn_music_off.png'
          }
          scale={0.6}
          ref={(gameObject) => {
            this.btnMusic = gameObject;
            this.audioMusicName = gameObject.frame.name;
            if (this.audioMusicName === 'btn_music.png') {
              this.audio.musicDefault.play();
            }
          }}
          onPointerDown={this.onMusic}
        />

        <Sprite
          x={config.width - 390}
          y={config.height - 675}
          texture="sound"
          frame={
            localStorage.getItem(LocalStorageKey.Sound) ?? 'btn_sound_off.png'
          }
          scale={0.6}
          ref={(gameObject) => {
            this.btnSound = gameObject;
            this.audioSoundName = gameObject.frame.name;
          }}
          onPointerDown={this.onSound}
        />

        <BaseSpin baseSpinRef={(gameObject) => (this.baseSpin = gameObject)} />
      </Fragment>,
      this,
    );
  }

  /** Called when the last reel column finishes its stop animation. */
  handleReelsFinished() {
    if (!this.fsm.dispatch({ type: 'REELS_STOPPED' })) {
      return;
    }
    this.refreshFlowLabel();

    this.time.delayedCall(450, () => {
      if (!this.fsm.dispatch({ type: 'REVEAL_PRESENTATION_DONE' })) {
        return;
      }
      this.refreshFlowLabel();

      const adapter = this.game.registry.get(
        'dispenseAdapter',
      ) as DispenseAdapter;

      void adapter.dispense('placeholder-tier').then(() => {
        if (!this.fsm.dispatch({ type: 'DISPENSE_OR_REDEEM_DONE' })) {
          return;
        }
        this.refreshFlowLabel();

        this.time.delayedCall(1000, () => {
          if (!this.fsm.dispatch({ type: 'SESSION_COMPLETE_ACK' })) {
            return;
          }
          this.refreshFlowLabel();
          this.baseSpin.clearTint();
          this.btnMusic.clearTint();
          this.btnSound.clearTint();
        });
      });
    });
  }

  private formatFlowLabel() {
    return `Beer Spin · ${this.fsm.getState()}`;
  }

  private refreshFlowLabel() {
    this.flowLabel.setText(this.formatFlowLabel());
  }

  private onMusic = () => {
    if (this.fsm.getState() === BeerSpinState.Spinning) {
      return;
    }
    if (this.audioMusicName === 'btn_music.png') {
      this.audioMusicName = 'btn_music_off.png';
      this.audio.musicDefault.stop();
      this.audio.audioWin.stop();
    } else {
      this.audioMusicName = 'btn_music.png';
      this.audioPlayButton();
      this.audio.musicDefault.play();
    }

    localStorage.setItem(LocalStorageKey.Music, this.audioMusicName);
    this.btnMusic.setTexture('sound', this.audioMusicName);
  };

  private onSound = () => {
    if (this.fsm.getState() === BeerSpinState.Spinning) {
      return;
    }
    if (this.audioSoundName === 'btn_sound.png') {
      this.audioSoundName = 'btn_sound_off.png';
    } else {
      this.audioSoundName = 'btn_sound.png';
      this.audio.audioButton.play();
    }

    localStorage.setItem(LocalStorageKey.Sound, this.audioSoundName);
    this.btnSound.setTexture('sound', this.audioSoundName);
  };

  audioPlayButton() {
    if (this.audioSoundName === 'btn_sound.png') {
      this.audio.audioButton.play();
    }
  }
}
