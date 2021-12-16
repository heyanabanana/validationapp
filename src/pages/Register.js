/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import useUser from "../config/UseUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import {
  Flex,
  Avatar,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Text,
  Button,
  CircularProgress,
} from "@chakra-ui/react";

export default function Register() {
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid"),
      name: yup.string().required("Name is required"),
      surname: yup.string().required("Surname is required"),
      username: yup.string().required("DNI is required"),
      password: yup
        .string()
        .required("Pasword is required")
        .min(5, "Password must have at least 5 characters"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [, navigate] = useLocation();

  const { isRegisterLoading, hasRegisterError, signIn, isRegister, isLogged } =
    useUser();
  const [hashcode, setHashcode] = useState(null);

  const onSubmit = (data) => {
    signIn(data);
    setHashcode(window.sessionStorage.getItem("hashcode"));
  };

  useEffect(() => {
    if (isRegister) navigate("/onboarding");
  }, [isRegister, navigate]);

  return (
    <>
      {isLogged ? (
        navigate("/")
      ) : (
        <Flex w="100vw" align="center" justify="center">
          {isRegisterLoading && (
            <Flex w="100vw" p={10} mt={10} align="center" justify="center">
              <CircularProgress isIndeterminate color="teal.300" />
            </Flex>
          )}
          {!isRegisterLoading && (
            <Flex
              w="auto"
              p={10}
              mt={10}
              shadow="md"
              direction="column"
              align="center"
              rounded="xl"
              justify="center"
            >
              <Avatar size="xl" bg="teal" />
              <Heading mb={10} color="teal">
                Welcome
              </Heading>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center "
              >
                {" "}
                <Flex w="auto" direction="column" align="left">
                  <Text color="teal" htmlFor="name">
                    Name
                  </Text>
                  <span className="p-input-icon-left">
                    <i className="pi pi-user" />
                    <InputText
                      type="text"
                      placeholder="Name"
                      {...register("name")}
                    />
                  </span>
                  <small id="username2-help" className="p-error p-d-block">
                    {errors.name && errors.name.message}
                  </small>
                  <Text color="teal" htmlFor="surname">
                    Surname
                  </Text>
                  <span className="p-input-icon-left">
                    <i className="pi pi-user" />
                    <InputText
                      type="text"
                      placeholder="Surname"
                      {...register("surname")}
                    />
                  </span>
                  <small id="username2-help" className="p-error p-d-block">
                    {errors.surname && errors.surname.message}
                  </small>
                  <Text color="teal" htmlFor="email">
                    Email
                  </Text>
                  <span className="p-input-icon-left">
                    <i className="pi pi-envelope" />
                    <InputText
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                    />
                  </span>
                  <Text color="teal" htmlFor="username">
                    Documento de Identidad
                  </Text>
                  <span className="p-input-icon-left">
                    <i className="pi pi-id-card" />
                    <InputText
                      type="text"
                      placeholder="Documento de Identidad"
                      {...register("username")}
                    />
                  </span>
                  <small id="username2-help" className="p-error p-d-block">
                    {errors.username && errors.username.message}
                  </small>
                  <Text color="teal" htmlFor="username">
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
                    {errors.password && errors.password.message}
                  </small>
                  <span>
                    <Button mt={6} colorScheme="teal" as="button" type="submit">
                      Register
                    </Button>
                  </span>{" "}
                </Flex>{" "}
                {hasRegisterError && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Fail on register, try again!</AlertTitle>
                    <Link to="/">
                      <CloseButton position="absolute" right="8px" top="8px" />
                    </Link>
                  </Alert>
                )}{" "}
              </form>{" "}
            </Flex>
          )}
        </Flex>
      )}

      {hashcode == null ? (
        <p></p>
      ) : (
        <Alert status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      )}
    </>
  );
}
