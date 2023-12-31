var paymentWidget = PaymentWidget(
  "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq",
  PaymentWidget.ANONYMOUS
);

/**
 * 결제창을 렌더링합니다.
 * @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods%EC%84%A0%ED%83%9D%EC%9E%90-%EA%B2%B0%EC%A0%9C-%EA%B8%88%EC%95%A1
 */
paymentWidget.renderPaymentMethods("#payment-method", { value: 50000 });

$("#payment-request-button").on("click", function () {
  /** 결제 요청
   * @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment%EA%B2%B0%EC%A0%9C-%EC%A0%95%EB%B3%B4
   */
  paymentWidget.requestPayment({
    orderId: generateRandomString(),
    orderName: "토스 티셔츠 외 2건",
    successUrl: window.location.origin + "/success",
    failUrl: window.location.origin + "/fail",
  });
});

function generateRandomString() {
  return window.btoa(Math.random()).slice(0, 20);
}
