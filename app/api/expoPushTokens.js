import client from "./client";

const register = (token, pushToken) => {
  return client.get(
    `/updateToken.php?token=${token}&notify_token=${pushToken}`
  );
};
export default {
  register,
};
