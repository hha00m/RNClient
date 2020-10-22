import client from "./client";

const getOrder = (token, id, nofiy_id) => {
  let url = `/getOrder.php?token=${token}&orderid=${id}`;
  if (nofiy_id) url += `&notification_id=${nofiy_id}`;
  return client.get(url);
};
export default {
  getOrder,
};
