import client from "./client";

const getCities = (token) => client.get(`/getCities.php?token=${token}`);

export default {
  getCities,
};
