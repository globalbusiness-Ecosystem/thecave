"use client";

import { api } from "@/lib/api";
import { BACKEND_URLS } from "@/lib/system-config";

export type PaymentMetadata = { [key: string]: any };
export type PaymentOptions = {
  amount: number;
  memo?: string;
  metadata: PaymentMetadata;
  onComplete?: (metadata: PaymentMetadata) => void;
  onError?: (error: Error, payment?: PiPayment) => void;
};
export type PiPaymentData = { amount: number; memo: string; metadata: PaymentMetadata };
export type PiPaymentCallbacks = {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: PiPayment) => void;
};
export type PiPayment = {
  identifier: string;
  amount: number;
  metadata: PaymentMetadata;
  transaction: { txid: string; _link: string } | null;
};

declare global {
  interface Window {
    Pi: {
      init: (config: { version: string; sandbox?: boolean }) => Promise<void>;
      authenticate: (scopes: string[], cb: (payment: PiPayment) => Promise<void>) => Promise<{ accessToken: string; user: { uid: string; username: string } }>;
      createPayment: (paymentData: PiPaymentData, callbacks: PiPaymentCallbacks) => void;
      getIncompletePayments: () => Promise<PiPayment[]>;
    };
    pay: (options: PaymentOptions) => Promise<void>;
  }
}

const createPaymentCallbacks = (options: PaymentOptions): PiPaymentCallbacks => ({
  onReadyForServerApproval: async (paymentId: string) => {
    try {
      await api.post(BACKEND_URLS.APPROVE_PAYMENT(paymentId), { action: "approve" });
    } catch (error) {
      console.error("Failed to approve payment:", error);
    }
  },
  onReadyForServerCompletion: async (paymentId: string, txid: string) => {
    try {
      await api.post(BACKEND_URLS.COMPLETE_PAYMENT(paymentId), { action: "complete", txid });
      if (options.onComplete) options.onComplete({ txid });
    } catch (error) {
      console.error("Failed to complete payment:", error);
      if (options.onError) options.onError(error instanceof Error ? error : new Error("Failed"));
    }
  },
  onCancel: (paymentId: string) => console.log("Payment cancelled:", paymentId),
  onError: (error: Error, payment?: PiPayment) => {
    console.error("Payment error:", error, payment);
    if (options.onError) options.onError(error, payment);
  },
});

export const pay = async (options: PaymentOptions): Promise<void> => {
  window.Pi.createPayment(
    { amount: options.amount, memo: options.memo || `Payment of ${options.amount} Pi`, metadata: options.metadata },
    createPaymentCallbacks(options)
  );
};

export const checkIncompletePayments = async (payment: PiPayment): Promise<void> => {
  try {
    if (!payment.transaction) return;
    await api.post(BACKEND_URLS.COMPLETE_PAYMENT(payment.identifier), {
      action: "complete",
      txid: payment.transaction.txid,
    });
  } catch (error) {
    console.error("Failed to notify incomplete payment:", error);
  }
};

export const initializeGlobalPayment = (): void => {
  if (typeof window !== "undefined") window.pay = pay;
};
