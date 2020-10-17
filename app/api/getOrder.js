import client from "./client";

// const getOrder = (id) => {
//   return fetch(
//     `getOrder.php?token=5f637eb2b080f5f637eb2b08115f637eb2b08135f637eb2b0814&orderid=198932`
//   )
//     .then((response) => response.json())
//     .then((json) => {
//       return json;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
const getOrder = (token, id) =>
  client.get(`/getOrder.php?token=${token}&orderid=${id}`);

export default {
  getOrder,
};
