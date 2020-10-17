import client from "./client";

const get = (token) => client.get(`/config.php?token=${token}`);

export default {
  get,
};
