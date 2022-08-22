import axios, { AxiosResponse } from "axios";
import { makePathForImage } from "./Resources";
import noAvatar from "@img/no_avatar.png";

export interface Type {
  name: string,
  email: string,
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
    return userInfo;
}

/**
 * ユーザーのアバターアップロード
 * @param file
 * @returns filePath
 */
export const postAvatar = async (file: string | Blob): Promise<string> => {
  const form = new FormData();
  form.append('upload_file', file);
  const settings = { headers: { 'content-type': 'multipart/form-data' } }
  const resp = await axios.post("api/file/upload",
    form,
    settings
  );
  return resp.data;
}

/**
 * ユーザー情報更新
 * @param param
 * @returns
 */
export const postUserInfo = async (param: Type): Promise<AxiosResponse> => {
  const resp = (await axios.put("/api/user", param)).data;
  return resp;
}

/**
 * ユーザー退会
 * @returns
 */
export const withdrawUser = async (): Promise<AxiosResponse> => {
  const resp = (await axios.delete("/api/user")).data;
  return resp;
};
