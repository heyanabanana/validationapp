import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "wouter";
import useUser from "../config/UseUser";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const { isLogged, logout } = useUser();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"} color="Teal">
          Validation App
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon color="teal" w={10} />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        mt={{ base: 4, md: 0 }}
      >
        <Flex align="center">
          <Button colorScheme="gray.700" variant="ghost">
            About{" "}
          </Button>
          <Button colorScheme="gray.700" variant="ghost">
            Open Boot Camp
          </Button>
        </Flex>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {isLogged ? (
          <Button size="sm" colorScheme="red" onClick={logout}>
            Logout
          </Button>
        ) : (
          <>
            <Link to="/register">
              <Button
                variant="outline"
                colorScheme="teal"
                size="sm"
                _hover={{
                  bg: "teal.600",
                  borderColor: "teal.600",
                  color: "white",
                }}
              >
                Create account
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="outline"
                colorScheme="teal"
                size="sm"
                ml={1}
                _hover={{
                  bg: "teal.600",
                  borderColor: "teal.600",
                  color: "white",
                }}
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;
