import React, { useRef, useState } from "react";
import uploadImages from "../services/uploadImages";
import { Flex } from "@chakra-ui/react";

const UploadImages = () => {
  const [photo1, setPhoto1] = useState();
  const [photo2, setPhoto2] = useState();
  const [data, setData] = useState();

  const hashcode = window.sessionStorage.getItem("hashcode");

  const uploadFiles = () => {
    uploadImages(photo1, photo2, hashcode).then((response) => {
      setData(response);
    });
    console.log(photo1, photo2, hashcode);
    console.log(data);
  };

  console.log(photo1);
  console.log(photo2);

  return (
    <Flex p={10} direction="column">
      <form onSubmit={uploadFiles}>
        <input type="file" onChange={(e) => setPhoto1(e.target.value)} />
        <input type="file" onChange={(e) => setPhoto2(e.target.value)} />
        <button type="submit">SEND</button>
      </form>
    </Flex>
  );
};
export default UploadImages;
