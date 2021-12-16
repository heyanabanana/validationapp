import { ENDPOINT } from "../config/ENPOINT";

export default function getUsers(hashcode, token) {
  return fetch(`${ENDPOINT}/onboarding/users/${hashcode}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
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
