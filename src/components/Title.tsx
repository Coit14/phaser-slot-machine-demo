import type Phaser from 'phaser';
import { Fragment, Sprite, useRef, useScene } from 'phaser-jsx';

import config from '../config';
import { GameStateMachine } from '../game/state';
import type { Audio } from './Audio';

const scaleObject = {
  default: 1.2,
  scale: 1.1,
  scale2: 1,
  scale3: 0.9,
};

interface Props {
  audio: Audio;
}

export function Title(props: Props) {
  const buttonRef = useRef<Phaser.GameObjects.Sprite>();
  const titleRef = useRef<Phaser.GameObjects.Sprite>();
  const pulseTimerRef = useRef<Phaser.Time.TimerEvent | null>(null);
  const scene = useScene();

  function startLogoPulseOnce() {
    if (pulseTimerRef.current) {
      return;
    }

    pulseTimerRef.current = scene.time.addEvent({
      delay: 150,
      loop: true,

      callback: () => {
        const title = titleRef.current;
        if (!title || !title.active) {
          return;
        }

        const scale = title.scaleX;

        const near = (a: number, b: number) => Math.abs(a - b) < 0.01;

        if (near(scale, scaleObject.default)) {
          title.setScale(scaleObject.scale);
        } else if (near(scale, scaleObject.scale)) {
          title.setScale(scaleObject.scale2);
        } else if (near(scale, scaleObject.scale2)) {
          title.setScale(scaleObject.scale3);
        } else {
          title.setScale(scaleObject.default);
        }
      },
    });
  }

  return (
    <Fragment>
      <Sprite
        x={config.width / 2}
        y={config.height / 2}
        texture="bgPreload"
        frame="bg_menu.png"
      />

      <Sprite
        x={config.width / 2}
        y={config.height - 500}
        texture="logo"
        frame="logo_game.png"
        scale={scaleObject.default}
        ref={(gameObject) => {
          titleRef.current = gameObject;
          startLogoPulseOnce();
        }}
      />

      <Sprite
        x={config.width / 2}
        y={config.height - 150}
        texture="bgButtons"
        frame="btn_play.png"
        scale={0.9}
        ref={buttonRef}
        onPointerDown={() => {
          const fsm = scene.game.registry.get(
            'beerSpinFsm',
          ) as GameStateMachine;
          fsm.dispatch({ type: 'ATTRACT_PLAY_TAP' });
          fsm.dispatch({ type: 'MOCK_PAYMENT_OK' });

          props.audio.musicBackgroundDefault.stop();
          pulseTimerRef.current?.remove();
          pulseTimerRef.current = null;
          props.audio.audioButton.play();
          scene.scene.start('Game');
        }}
      />
    </Fragment>
  );
}
