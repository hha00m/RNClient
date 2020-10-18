import client from "./client";

const getOrder = (token, id) =>
  client.get(`/getOrder.php?token=${token}&orderid=${id}`);

export default {
  getOrder,
};
