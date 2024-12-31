import { createContext, useContext, useState } from "react";

export const UserAuthContext = createContext();

const useUserAuthConext = () => useContext(UserAuthContext);

export const UserAuthConextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);

  return (
    <UserAuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default useUserAuthConext;
