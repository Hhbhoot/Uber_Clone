import { createContext, useContext, useState } from "react";

const CaptainAuthContext = createContext();

export const useCaptainAuthContext = () => useContext(CaptainAuthContext);

export const CaptainAuthProvider = ({ children }) => {
  const [captain, setCaptain] = useState();
  const [isAuth, setIsAuth] = useState(false);

  <CaptainAuthContext.Provider value={(captain, setCaptain, isAuth, setIsAuth)}>
    {children}
  </CaptainAuthContext.Provider>;
};
