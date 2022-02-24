import axios from "axios";
import { makePathForImage } from "./Resources";
import noAvatar from "@img/no_avatar.png";

export interface Type {
  name: string,
  email: string,
  // avatar?: string | ArrayBuffer | null,
  avatar?: string | null,
  message?: string,
  imgFile?: Blob | string | null,
}

export const INITIAL_STATE: Type = {
  name: "",
  email: "",
  avatar: "",
  message: "",
  imgFile: ""
}

export const getAuthenticatedUser = async (): Promise<Type> => {
    const userInfo: Type = (await axios.get("/api/authenticatedUser")).data;
    console.log(userInfo);
    return userInfo;
}
