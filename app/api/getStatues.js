import client from "./client";

const getStatues = (token) => client.get(`/getStatues.php?token=${token}`);

export default {
  getStatues,
};
