import client from "./client";

const getStores = (token) => client.get(`/getStores.php?token=${token}`);

export default {
  getStores,
};
