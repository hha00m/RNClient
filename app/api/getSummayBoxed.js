import client from "./client";

const get = (token) => client.get(`/static.php?token=${token}`);

export default {
  get,
};
