import { ENDPOINT } from "../config/ENPOINT";

export default function getUsers(photo1, photo2, hashcode) {
  return fetch(`${ENDPOINT}/onboarding/photos/${hashcode}`, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(photo1, photo2),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Response is NOT ok");
      return response.json();
    })
    .then((response) => {
      console.log(response);
      sessionStorage.setItem("response", response);
      return response;
    });
}
