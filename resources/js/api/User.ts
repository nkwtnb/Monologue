import axios from "axios";

export interface Type {
  name: string,
  email: string,
  avatar?: string | ArrayBuffer | null,
  imgFile?: Blob | string | null,
}

export const INITIAL_STATE: Type = {
  name: "",
  email: "",
  avatar: "",
  imgFile: ""
}

// export const get = async (): Promise<Type | undefined> => {
//   try {
//     const userInfo = await axios.get("api/user");
//     if (userInfo.data) {
//       return userInfo.data;
//     } else {
//       return INITIAL_STATE;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getAuthencatedUser = async (): Promise<Type> => {
    const userInfo = await axios.get("/authencatedUser");
    return userInfo.data;
}
