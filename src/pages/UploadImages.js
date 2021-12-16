import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { ENDPOINT } from "../config/ENPOINT";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Link } from "wouter";

import { useLocation } from "wouter";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function UploadImages() {
  const [location] = useLocation();

  const routeHash = location.replace("validationapp.vercel.app/onboarding", "");

  const hashRoute = routeHash.replace("/onboarding/", "");

  const [files, setFiles] = useState([]);

  return (
    <Flex p={10} direction="column">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={2}
        server={`${ENDPOINT}/onboarding/uploadphoto/${hashRoute}`}
        name="photo"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />

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
