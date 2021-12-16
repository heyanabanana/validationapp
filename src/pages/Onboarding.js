import {
  Flex,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";
import React from "react";
import QRCode from "react-qr-code";
import { Link } from "wouter";

const Onboarding = () => {
  const hashcode = window.sessionStorage.getItem("hashcode");

  return (
    <Flex
      w="100vw"
      align="center"
      justify="center"
      mt={10}
      mb={10}
      direction="column"
    >
      <Heading as="h1" color="teal">
        Welcome
      </Heading>
      <Text color="gray.500">
        We need to validate your identity. Please have your identity document
        handy.
      </Text>

      <Heading mt={10} mb={2} as="h2" color="teal" size="sm">
        Follow the steps below:
      </Heading>
      <UnorderedList color="gray.600" mb={10}>
        <ListItem>Scan the QR code below</ListItem>
        <ListItem>Upload the images of your identity document</ListItem>
        <ListItem>
          We need a photo of the front face and another of the back
        </ListItem>
        <ListItem>
          Your account will be validated soon by an administrator
        </ListItem>
      </UnorderedList>

      <QRCode
        value={`https://validationapp.vercel.app/onboarding/${hashcode}`}
        params={hashcode}
      />
      <Heading mt={10} mb={2} as="h2" color="teal" size="sm">
        No phone? Continue with computer:
      </Heading>

      <Link to={`/onboarding/${hashcode}`} params={hashcode}>
        <Button colorScheme="teal">Upload Files</Button>
      </Link>
    </Flex>
  );
};

export default Onboarding;
