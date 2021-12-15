import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image } from "primereact/image";

import { useEffect, useState } from "react";
import getHashcode from "../services/getHashcode";

export default function UserDashboard() {
  const [hashcode, setHashcode] = useState();

  const userFake = {
    fullname: "Fulanito Fernandez",
    email: "fulanito@fernandez.es",
    photo1:
      "https://almenas.es/wp-content/uploads/2021/11/dni-para-perros-scaled.jpeg",
    photo2:
      "https://edirectotv.com/wp-content/uploads/2021/10/Copia-de-Copia-de-Copia-de-Copia-de-Copia-de-Copia-de-Copia-de-Copia-de-Copia-de-RADIO-NACIONAL-DE-ESPANA-1.png",
    validated: true,
  };
  // useEffect(() => {
  // const username = window.sessionStorage.getItem("username");
  // getHashcode(username).then((value) => {
  //   setHashcode(value);
  // });
  // });
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          bg="teal"
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {userFake.fullname}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {userFake.email}
        </Text>
        <Image src={userFake.photo1} alt={userFake.fullname} preview />
        <Image src={userFake.photo2} alt={userFake.fullname} preview />

        <Box mt={4} direction={"row"} spacing={4}>
          {userFake.validated === true ? (
            <Badge colorScheme="green">Validated</Badge>
          ) : (
            <Badge colorScheme="gray">No validated</Badge>
          )}
        </Box>
      </Box>
    </Center>
  );
}
