import axios, { AxiosResponse } from "axios";

/**
 * パスワードリセット 
 * @returns
 */
 export const reset = async (email: string): Promise<{message: string}> => {
  try {
    const resp = (await axios.post("/password/email", {
      email: email
    })).data;
    return resp;
  } catch (e: any) {
    return Promise.reject(e.response.data);
  }
};
