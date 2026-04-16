export type DispenseSuccess = {
  readonly ok: true;
};

export type DispenseFailure = {
  readonly ok: false;
  readonly reason: string;
};

export type DispenseResult = DispenseSuccess | DispenseFailure;

/**
 * Future: pour hardware, voucher printer, locker API, etc.
 */
export interface DispenseAdapter {
  dispense(tierId: string): Promise<DispenseResult>;
}
