import Phaser from 'phaser';
import { render } from 'phaser-jsx';

import { MockDispenseAdapter, MockPaymentAdapter } from '../adapters/mocks';
import { Audio } from '../components/Audio';
import { Title } from '../components/Title';
import { GameStateMachine } from '../game/state';

/** Attract / idle — entry after preload. */
export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  create() {
    const fsm = new GameStateMachine();
    this.game.registry.set('beerSpinFsm', fsm);
    this.game.registry.set('paymentAdapter', new MockPaymentAdapter());
    this.game.registry.set('dispenseAdapter', new MockDispenseAdapter());

    const audio = new Audio(this);

    // Browsers block AudioContext until a user gesture — start attract music on first touch.
    this.input.once('pointerdown', () => {
      if (!audio.musicBackgroundDefault.isPlaying) {
        audio.musicBackgroundDefault.play();
      }
    });

    render(<Title audio={audio} />, this);
  }
}
