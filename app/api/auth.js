import client from "./client";

const login = (phone, password) =>
  client.get(`/login.php`, { username: phone, password: password });

// const getLogin = (phone, password) => {
//   const url = `https://albarqexpress.com/client/api/login.php?username=${phone}&password=${password}`;
//   console.log(url);
//   return fetch(url)
//     .then((response) => response.json())
//     .then((json) => {
//       return json;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
export default {
  login,
  // getLogin,
};
