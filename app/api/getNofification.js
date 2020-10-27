import client from "./client";

const get = (token, page) =>
  client.get(`/getNotification.php?token=${token}&page=${page}`);

export default {
  get,
};
