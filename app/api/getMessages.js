import client from "./clientChat";

const getMessages = (token, id) =>
  client.get(`/getMessages.php?token=${token}&orderid=${id}`);

const sendMessages = (token, id, message) =>
  client.get(
    `/sendMessage.php?token=${token}&orderid=${id}&message=${message}`
  );

export default {
  getMessages,
  sendMessages,
};
