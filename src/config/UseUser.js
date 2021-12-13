import Context from "./UserContext";
import { useCallback, useContext, useState } from "react";
import loginService from "../services/login";
import registerService from "../services/register";
import { useLocation } from "wouter";

export default function useUser() {
  const { token, setToken } = useContext(Context);
  const role = useContext(Context);
  const [, navigate] = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback(
    ({ username, password }) => {
      setState({ loading: true, error: false });
      loginService({ username, password })
        .then((token) => {
          window.sessionStorage.setItem("token", token);

          setState({ loading: false, error: false });
          setToken(token);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("token");
          window.sessionStorage.removeItem("role");

          setState({ loading: false, error: true });
          console.log(err);
        });
    },
    [setToken]
  );

  const signIn = useCallback(({ name, email, surname, password, username }) => {
    setState({ loading: true, error: false });
    registerService({ name, email, surname, password, username })
      .then((name) => {
        setState({ loading: false, error: false });
        setIsRegister(true);
        window.sessionStorage.setItem("hashcode");
        window.sessionStorage.setItem("username");
        window.sessionStorage.setItem("fullname");
      })
      .catch((err) => {
        window.sessionStorage.removeItem("hashcode");
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("fullname");
        setState({ loading: false, error: true });
        setIsRegister(false);
        console.log(err);
      });
  }, []);

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("role");

    setToken(null);
    navigate("/");
  }, [navigate, setToken]);

  return {
    isLogged: Boolean(token),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    signIn,
    isRegister,
    token,
    role,
    isRegisterLoading: state.loading,
    hasRegisterError: state.error,
  };
}
