import Phaser from 'phaser';
import { DynamicBitmapText, Fragment, Sprite, useScene } from 'phaser-jsx';

import config from '../config';
import { GameStateMachine } from '../game/state';
import { playSpinStartAudio, setSpinningTint } from '../helpers';
import type { Game } from '../scenes';
import { Tween } from './Tween';

interface Props {
  baseSpinRef: (gameObject: Phaser.GameObjects.Sprite) => void;
}

export function BaseSpin(props: Props) {
  const scene = useScene<Game>();
  let baseSpin!: Phaser.GameObjects.Sprite;

  function playTweens() {
    const fsm = scene.game.registry.get('beerSpinFsm') as GameStateMachine;

    if (!fsm.isReadyToSpin()) {
      return;
    }

    if (!fsm.dispatch({ type: 'SPIN_REQUESTED' })) {
      return;
    }

    setSpinningTint(scene);
    playSpinStartAudio(scene);
    baseSpin.setScale(0.9);
    scene.baseSpinTweens = new Tween(scene);
  }

  return (
    <Fragment>
      <Sprite
        x={config.width - 275}
        y={config.height - 50}
        texture="bgButtons"
        frame="btn-spin.png"
        onPointerDown={playTweens}
        onPointerUp={() => baseSpin.setScale(1)}
        ref={(gameObject) => {
          props.baseSpinRef(gameObject);
          baseSpin = gameObject;
        }}
      />

      <DynamicBitmapText
        x={config.width - 315}
        y={config.height - 70}
        font="txt_bitmap"
        text="SPIN"
        fontSize={38}
        ref={(gameObject) => gameObject.setDisplayCallback(scene.textCallback)}
      />
    </Fragment>
  );
}
