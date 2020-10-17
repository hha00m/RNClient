import client from "./client";

const get = (token) => client.get(`/chat.php?token=${token}`);

export default {
  get,
};
