import client from "./client";

const login = (phone, password) =>
  client.get(`/login.php?username=${phone}&password=${password}`);

export default {
  login,
};
