import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image } from "primereact/image";
import getUserHash from "../services/getUserHash";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [user, setUser] = useState();
  const [hashcode, setHashcode] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    setHashcode(window.sessionStorage.getItem("hashcode"));
    setToken(window.sessionStorage.getItem("token"));
    getUserHash(hashcode, token).then((value) => {
      setUser(value.user);
    });
  }, [hashcode, token]);

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
          {user.fullname}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {user.email}
        </Text>
        <Image src={user.photo1} alt={user.fullname} preview />
        <Image src={user.photo2} alt={user.fullname} preview />
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {user.username}
        </Text>
        <Box mt={4} direction={"row"} spacing={4}>
          {user.validated === true ? (
            <Badge colorScheme="green">Validated</Badge>
          ) : (
            <Badge colorScheme="gray">No validated</Badge>
          )}
        </Box>
      </Box>
    </Center>
  );
}
