export type PaymentSuccess = {
  readonly ok: true;
  readonly transactionId: string;
};

export type PaymentFailure = {
  readonly ok: false;
  readonly reason: string;
};

export type PaymentResult = PaymentSuccess | PaymentFailure;

/**
 * Future: card reader, QR, POS, etc.
 */
export interface PaymentAdapter {
  requestPayment(): Promise<PaymentResult>;
}
