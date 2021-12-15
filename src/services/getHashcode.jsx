import { ENDPOINT } from "../config/ENPOINT";

export default async function getHashcode(username) {
  const res = await fetch(`${ENDPOINT}/hashcode/update/${username}`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  const res_2 = await res.json();
  const value = res_2;
  return value;
}
