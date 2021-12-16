/* eslint-disable eqeqeq */
import React from "react";
import { Link } from "wouter";
import useUser from "../config/UseUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";

import {
  Flex,
  CircularProgress,
  Heading,
  Avatar,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

export default function Login() {
  //FORM VALIDATION
  const schema = yup
    .object({
      password: yup.string().required("Password is required"),
      username: yup.string().required("DNI is required"),
    })
    .required();

  const { isLoginLoading, hasLoginError, login } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //LOGIN SERVICE
  const onSubmit = (data) => {
    login(data);
  };

  return (
    <>
      {isLoginLoading && (
        <Flex w="100vw" p={10} align="center" justify="center">
          <CircularProgress isIndeterminate color="teal.300" />
        </Flex>
      )}
      {!isLoginLoading && (
        <Flex w="100vw" p={10} align="center" justify="center">
          <Flex
            w="auto"
            p={10}
            shadow="md"
            rounded="xl"
            direction="column"
            align="center"
            justify="center"
          >
            <Avatar size="xl" bg="teal" />
            <Heading mb={10} color="teal">
              Welcome
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" align="left" justify="center">
                <Text color="teal" htmlFor="username">
                  {" "}
                  Documento de Identidad
                </Text>
                <span className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText
                    type="text"
                    placeholder="Documento de Identidad"
                    {...register("username")}
                  />
                </span>
                <small id="username2-help" className="p-error p-d-block">
                  {errors.email && errors.email.message}
                </small>
                <Text mt={6} color="teal" htmlFor="username">
                  Password
                </Text>
                <span className="p-input-icon-left">
                  <i className="pi pi-lock" />
                  <InputText
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                </span>
                <small id="username2-help" className="p-error p-d-block">
                  {" "}
                  {errors.password && errors.email.password}
                </small>
              </Flex>
              <Flex direction="column">
                <Button mt={6} colorScheme="teal" as="button" type="submit">
                  Login
                </Button>
              </Flex>{" "}
              <Link
                mt={3}
                className="mt-3 text-gray-600 text-xs	"
                to="/register"
              >
                You don't have account?
              </Link>
            </form>
          </Flex>
        </Flex>
      )}
      {hasLoginError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Your credentials are invalid!</AlertTitle>
          <Link to="/">
            <CloseButton position="absolute" right="8px" top="8px" />
          </Link>
        </Alert>
      )}
    </>
  );
}
