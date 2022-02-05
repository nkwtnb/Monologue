import React, { useContext, useEffect } from 'react';
import NewPost from '../organisms/NewPost';
import TImeline from '../organisms/TImeline';
import axios from 'axios';
import { AuthContext } from "../../Context";
interface UserInfo {
  name: string,
  email: string,
  avatar?: string | ArrayBuffer | null,
  imgFile?: Blob | string | null,
}

const INITIAL_STATE: UserInfo = {
  name: "",
  email: "",
  avatar: "",
  imgFile: ""
}

export default () => {
  const {authState, setAuthState} = useContext(AuthContext);

  const getUserInfo = async (): Promise<UserInfo | undefined> => {
    // const resp = await axios.get('/sanctum/csrf-cookie');
    try {
      const userInfo = await axios.get("/api/user");
      if (userInfo.data) {
        return userInfo.data;
      } else {
        return INITIAL_STATE;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const userInfo = await getUserInfo();
      setAuthState({ ...authState, ...userInfo });
    })();
  }, []);
  return (
    <>
      <NewPost />
      <TImeline />
    </>
  );
}
