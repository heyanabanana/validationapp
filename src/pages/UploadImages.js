import React, { useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ENDPOINT } from '../config/ENPOINT';

function UploadImages (params) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [photo1, setPhoto1] = useState();
  const [photo2, setPhoto2] = useState();
  const [data, setData] = useState();

  const hashcode = window.sessionStorage.getItem("hashcode");


  const onSubmit = (data) => {
    fetch(`${ENDPOINT}/onboarding/photos/${hashcode}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: data,
    })
      // .then((response) => {
      //   if (!response.ok) throw new Error("Response is NOT ok");
      //   return response.json();
      // })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("response", response);
        return response;
      });
  };

  return (
    <Flex p={10} direction="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("photo1")}
/>
        <input type="file" {...register("photo2")}
 />
         <input type="hidden" value={hashcode} {...register("hashcode")}
 />
        <button type="submit">SEND</button>
      </form>
    </Flex>
  );
};
export default UploadImages;
