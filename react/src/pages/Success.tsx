import React from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";

export function SuccessPage() {
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const res = api.postPaymentConfirmation({
      paymentKey: searchParams.get("paymentKey")!,
      orderId: searchParams.get("orderId")!,
      amount: Number(searchParams.get("amount")),
    });
  }, []);

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</div>
    </div>
  );
}
