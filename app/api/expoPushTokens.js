import client from "./client";

const register = (token, pushToken) =>
  client.get(`/updateToken.php?token=${token}&notify_token=${pushToken}`);

export default {
  register,
};
