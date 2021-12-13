import React, { useState } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(() =>
    window.sessionStorage.getItem("token")
  );
  const role =  window.sessionStorage.getItem("role")


  return (
    <Context.Provider value={{ token, setToken, role }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
