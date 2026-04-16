import type { DispenseAdapter, DispenseResult } from './DispenseAdapter';
import type { PaymentAdapter, PaymentResult } from './PaymentAdapter';

export class MockPaymentAdapter implements PaymentAdapter {
  async requestPayment(): Promise<PaymentResult> {
    return { ok: true, transactionId: `mock-${Date.now()}` };
  }
}

export class MockDispenseAdapter implements DispenseAdapter {
  async dispense(tierId: string): Promise<DispenseResult> {
    void tierId;
    return { ok: true };
  }
}
