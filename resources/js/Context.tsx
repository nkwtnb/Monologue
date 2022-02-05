import { createContext, PropsWithChildren, useState } from "react";

interface UserInfo {
  name: string,
  email: string,
  avatar?: string | ArrayBuffer | null,
  imgFile?: Blob | string | null,
}

interface Props {
  user: UserInfo | (() => UserInfo) | undefined
}

const initialState = {
  name: "",
  email: "",
  avatar: "",
  imgFile: "",
}

interface AuthContextType {
  authState: UserInfo;
  setAuthState: React.Dispatch<React.SetStateAction<UserInfo>>
}

export const AuthContext = createContext({} as AuthContextType);

export default (props: PropsWithChildren<Props>) => {
  const {user, children} = props;
  console.log("Context");
  console.log(user);
  const [authState, setAuthState] = useState<UserInfo>(user ? user : initialState);

  return (
    <AuthContext.Provider value={{authState, setAuthState}} >
      {children}
    </AuthContext.Provider>
  );
}