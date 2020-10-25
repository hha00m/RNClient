import client from "./client";

const getPdfs = (token, store, start, end, page) => {
  let url = `/invoices.php?token=${token}`;
  if (store) url += `&store=${store.id}`;
  if (start) url += `&start=${start}`;
  if (end) url += `&end=${end}`;
  url += `&page=${page}`;

  return client.get(url);
};
export default {
  getPdfs,
};
