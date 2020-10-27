import client from "./client";
import settings from "../config/settings";
const getOrders = (
  token,
  status,
  city,
  store,
  search,
  page = 1,
  limit = 10
) => {
  // let url = `https://alzaimexpress.com/client/api/search.php?token=${token}`;
  let url = `${settings.apiUrl}/search.php?token=${token}`;
  if (status) url += `&status=${status}`;
  if (search) url += `&search=${search}`;
  if (limit) url += `&limit=${limit}`;
  if (page) url += `&page=${page}`;
  if (store) url += `&store=${store}`;
  if (city) url += `&city=${city}`;
  console.log(url);
  return client.get(url);
};

export default {
  getOrders,
};
