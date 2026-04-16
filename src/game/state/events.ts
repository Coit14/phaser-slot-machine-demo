/** Externally triggered inputs to the Beer Spin flow (no betting). */
export type GameEvent =
  | { type: 'ATTRACT_PLAY_TAP' }
  | { type: 'MOCK_PAYMENT_OK' }
  | { type: 'SPIN_REQUESTED' }
  | { type: 'REELS_STOPPED' }
  | { type: 'REVEAL_PRESENTATION_DONE' }
  | { type: 'DISPENSE_OR_REDEEM_DONE' }
  | { type: 'SESSION_COMPLETE_ACK' };
