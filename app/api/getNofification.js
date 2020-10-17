import client from "./client";

const getNotifications = (token) =>
  client.get(`/getNotification.php?token=${token}`);

const get = (token) =>
  fetch(
    `https://albarqexpress.com/client/api/getNotification.php?token=${token}`
  )
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });

export default {
  getNotifications,
  get,
};
