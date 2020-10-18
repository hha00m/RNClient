import client from "./client";

const get = (token) => client.get(`/getNotification.php?token=${token}`);

export default {
  get,
};
