import client from "./client";

const getPdfs = (token, store) =>
  client.get(`/invoices.php?token=${token}&store=${store}`);

export default {
  getPdfs,
};
