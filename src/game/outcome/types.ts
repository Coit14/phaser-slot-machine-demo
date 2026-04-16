/**
 * Outcome / tier types for future deterministic spins.
 * Stub only — no payout math.
 */

/** Atlas frame name for a placeholder symbol, e.g. symbols_3.png */
export type SymbolFrameName = string;

export interface ReelColumnSymbols {
  /** Visible row indices after stop (placeholder: frame names). */
  readonly visibleFrames: readonly SymbolFrameName[];
}

export interface SpinOutcomePlaceholder {
  readonly tierId: string;
  readonly columns: readonly ReelColumnSymbols[];
}
