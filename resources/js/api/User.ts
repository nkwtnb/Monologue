import axios from "axios";

export interface Type {
  name: string,
  email: string,
  avatar?: string | ArrayBuffer | null,
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
    const userInfo = await axios.get("/api/authenticatedUser");
    return userInfo.data;
}
