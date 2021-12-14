import { ENDPOINT } from "../config/ENPOINT";

export default function getUsers(token) {
  return fetch(`${ENDPOINT}/panel/users`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const value = res;
      return value;
    });
}
