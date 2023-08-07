import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

const postPaymentConfirmation = async (data: any) => {
  const res = await instance.post("/payment/confirm", { ...data });
  console.log(res.data);
  return res.data;
};

export const api = {
  postPaymentConfirmation,
};
