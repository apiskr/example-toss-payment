var express = require("express");
var app = express();
var { resolve } = require("path");
var got = require("got");

var secretKey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";

app.use(express.static("./client"));

app.get("/", function (req, res) {
  var path = resolve("./client/index.html");
  res.sendFile(path);
});

app.get("/success", function (req, res) {
  var { paymentKey, orderId, amount } = req.query;

  /**
   * 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
   * 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
   * @see https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
   */
  var encryptedSecretKey =
    "Basic " + Buffer.from(secretKey + ":").toString("base64");

  got
    .post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      json: {
        orderId: orderId,
        amount: amount,
        paymentKey: paymentKey,
      },
      responseType: "json",
    })
    .then(function (response) {
      console.log(response.body);
      // TODO: 구매 완료 비즈니스 로직 구현

      var path = resolve("./client/success.html");
      res.sendFile(path);
    })
    .catch(function (error) {
      res.redirect(
        `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
      );
    });
});

app.get("/fail", function (req, res) {
  var path = resolve("./client/fail.html");
  res.sendFile(path);
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
