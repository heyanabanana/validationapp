import React, { useState } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(() =>
    window.sessionStorage.getItem("token")
  );

  const [hashcode, setHashcode] = useState(() =>
    window.sessionStorage.getItem("hashcode")
  );

  const [role, setRole] = useState(() => window.sessionStorage.getItem("role"));

  return (
    <Context.Provider
      value={{ token, setToken, role, setRole, hashcode, setHashcode }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
