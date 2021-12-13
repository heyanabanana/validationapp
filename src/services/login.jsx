
import { ENDPOINT } from '../config/ENPOINT';

export default function loginService({ username, password }) {
  return fetch(`${ENDPOINT}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Response is NOT ok");
      return res.json();
    })
    .then((res) => {
      const  token  = res.token;
      const role = res.role;
      window.sessionStorage.setItem("token", token);
      window.sessionStorage.setItem("role", role);
      return token;
    });
}
