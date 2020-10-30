import client from "./client";

const get = (token, page) =>
  client.get(`/getNotification.php?token=${token}&page=${page}&limit=20`);

export default {
  get,
};
