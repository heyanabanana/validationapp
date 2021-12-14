import { ENDPOINT } from "../config/ENPOINT";
import { useLocation } from "wouter";

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
      window.sessionStorage.setItem("token", res.token);
      return res;
    });
}
