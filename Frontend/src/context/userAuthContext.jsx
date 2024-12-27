import { createContext, useContext, useState } from "react";

const UserAuthContext = createContext();

export const useUserAuthConext = () => useContext(UserAuthContext);

export const userAuthConextProvider = (children) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);

  return (
    <UserAuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </UserAuthContext.Provider>
  );
};
