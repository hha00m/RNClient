import client from "./client";

const get = (token, status, city, store, search, page = 1, limit = 10) => {
  let url = `https://albarqexpress.com/client/api/getOrders.php?token=${token}`;
  if (status) url += `&status=${status}`;
  if (search) url += `&search=${search}`;
  if (limit) url += `&limit=${limit}`;
  if (page) url += `&page=${page}`;
  if (store) url += `&store=${store}`;
  if (city) url += `&city=${city}`;
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  get,
};
