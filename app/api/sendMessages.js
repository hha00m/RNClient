import client from "./clientChat";

const endpoint = "/getOrders.php";
const getListings = (phone, password, type) =>
  client.get(
    `/getOrders.php?username=${phone}&password=${password}&status=${type}`
  );

export default {
  getListings,
};
