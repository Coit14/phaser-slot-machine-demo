import type { GameEvent } from './events';

export enum BeerSpinState {
  Attract = 'Attract',
  AwaitPayment = 'AwaitPayment',
  ReadyToSpin = 'ReadyToSpin',
  Spinning = 'Spinning',
  Reveal = 'Reveal',
  DispenseOrRedeem = 'DispenseOrRedeem',
  SessionComplete = 'SessionComplete',
  Error = 'Error',
}

/**
 * Explicit Beer Spin lifecycle. Invalid transitions are rejected (returns false).
 */
export class GameStateMachine {
  private state: BeerSpinState = BeerSpinState.Attract;

  getState(): BeerSpinState {
    return this.state;
  }

  /** Whether the primary spin control should accept input. */
  isReadyToSpin(): boolean {
    return this.state === BeerSpinState.ReadyToSpin;
  }

  dispatch(event: GameEvent): boolean {
    const next = this.resolveTransition(event);
    if (next === null) {
      return false;
    }
    this.state = next;
    return true;
  }

  private resolveTransition(event: GameEvent): BeerSpinState | null {
    switch (this.state) {
      case BeerSpinState.Attract:
        if (event.type === 'ATTRACT_PLAY_TAP') {
          return BeerSpinState.AwaitPayment;
        }
        return null;

      case BeerSpinState.AwaitPayment:
        if (event.type === 'MOCK_PAYMENT_OK') {
          return BeerSpinState.ReadyToSpin;
        }
        return null;

      case BeerSpinState.ReadyToSpin:
        if (event.type === 'SPIN_REQUESTED') {
          return BeerSpinState.Spinning;
        }
        return null;

      case BeerSpinState.Spinning:
        if (event.type === 'REELS_STOPPED') {
          return BeerSpinState.Reveal;
        }
        return null;

      case BeerSpinState.Reveal:
        if (event.type === 'REVEAL_PRESENTATION_DONE') {
          return BeerSpinState.DispenseOrRedeem;
        }
        return null;

      case BeerSpinState.DispenseOrRedeem:
        if (event.type === 'DISPENSE_OR_REDEEM_DONE') {
          return BeerSpinState.SessionComplete;
        }
        return null;

      case BeerSpinState.SessionComplete:
        if (event.type === 'SESSION_COMPLETE_ACK') {
          return BeerSpinState.ReadyToSpin;
        }
        return null;

      case BeerSpinState.Error:
        return null;

      default:
        return null;
    }
  }
}
