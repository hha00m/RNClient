import client from "./client";

const getPdfs = (token) => client.get(`/invoices.php?token=${token}`);

export default {
  getPdfs,
};
