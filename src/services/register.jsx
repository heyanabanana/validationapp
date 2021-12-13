import { ENDPOINT } from "../config/ENPOINT";

export default function registerService({
  name,
  email,
  surname,
  password,
  username,
}) {
  return fetch(`${ENDPOINT}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    },
    body: JSON.stringify({ name, email, surname, password, username }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Response is NOT ok");
      return res.json();
    })
    .then((res) => {
      const fullname = res.user.fullname;
      const username = res.user.username;
      const hashcode = res.hashcode;
      window.sessionStorage.setItem("hashcode", hashcode);
      window.sessionStorage.setItem("username", username);
      window.sessionStorage.setItem("fullname", fullname);
      return name;
    });
}
