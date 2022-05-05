import React from "react";
import { createContext, PropsWithChildren, useState } from "react";
import * as userApi from "./api/User";

interface Props {
  user: userApi.Type | (() => userApi.Type) | undefined
}

interface AuthContextType {
  authState: userApi.Type;
  setAuthState: React.Dispatch<React.SetStateAction<userApi.Type>>
}

export const AuthContext = createContext({} as AuthContextType);

export default (props: PropsWithChildren<Props>) => {
  const {user, children} = props;
  const [authState, setAuthState] = useState<userApi.Type>(user ? user : userApi.INITIAL_STATE);

  return (
    <AuthContext.Provider value={{authState, setAuthState}} >
      {children}
    </AuthContext.Provider>
  );
}