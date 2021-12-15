import React, { useRef, useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ENDPOINT } from "../config/ENPOINT";
import useUser from "../config/UseUser";

import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Link } from "wouter";

import { useLocation } from "wouter";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function UploadImages(params) {
  const [location, setLocation] = useLocation();

  const routeHash = location.replace("validationapp.vercel.app/onboarding", "");

  const hashRoute = routeHash.replace("/onboarding/", "");

  const hashcode = params.hashcode;
  console.log(location);

  console.log(hashRoute);

  const [files, setFiles] = useState([]);

  return (
    <Flex p={10} direction="column">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={2}
        server={`${ENDPOINT}/onboarding/uploadphoto/${routeHash}`}
        name="photo"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      {console.log(files)}

      {files.length === 2 ? (
        <Link to="/login">
          <Button colorScheme="teal">Continuar</Button>
        </Link>
      ) : (
        <Button colorScheme="gray">Continuar</Button>
      )}
    </Flex>
  );
}
export default UploadImages;
