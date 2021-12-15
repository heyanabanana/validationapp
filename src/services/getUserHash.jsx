import { ENDPOINT } from "../config/ENPOINT";

export default function getUsers(hashcode) {
  return fetch(`${ENDPOINT}/onboarding/users/${hashcode}`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
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
