import axios from "axios";
import { Entry } from "@interface/Entry";

interface Props {
  name: string | undefined;
  filter: "post" | "like" | "media";
}

/**
 * パラメータに応じて、全投稿、いいねした投稿などを取得する
 */
export const getEntries = async ({ name, filter }: Props): Promise<Entry[]> => {
  // ホーム画面時
  if (name === "") {
    const entries = (await axios.get(`/api/words`)).data as Entry[];
    return entries;
    // ユーザー別 > いいね
  } else if (filter === "like") {
    const likeEntries = (await axios.get(`/api/words/user/${name}/likes`)).data as Entry[];
    return likeEntries;
    // ユーザー別 > 投稿 or メディア
  } else {
    const entries = (await axios.get(`/api/words/user/${name}/posts`)).data as Entry[];
    return entries;
  }
}

/**
 * 指定されたポストIDの投稿を取得する
 * @param postId 
 */
export const getEntry = async (postId: string | undefined): Promise<{entry: Entry, replies: Entry[]}> => {
  const resp = (await axios.get("/api/words/post/" + postId)).data;
  const entry: Entry = resp.entries[0];
  const replies: Entry[] = resp.replies;
  return {
    entry,
    replies
  };
}

/**
 * じぶんの「いいね」を取得する
 * @param authName 
 * @returns 
 */
export const getLikes = async (authName: string) => {
  const likeEntries = authName === "" ? [] : (await axios.get(`/api/words/user/${authName}/likes`)).data as Entry[];
  return likeEntries;
}

/**
 * 自分が「いいね」した投稿にフラグを立てる
 * @returns 
 */
export const setLikeStatus = async (entries: Entry[], authName: string): Promise<Entry[]> => {
  console.log(entries);
  const likeEntries = authName === "" ? [] : (await axios.get(`/api/words/user/${authName}/likes`)).data as Entry[];
  const resp = entries.map(entry => {
    for (let i = 0; i < likeEntries.length; i++) {
      const likeEntry = likeEntries[i];
      if (entry.id === likeEntry.id) {
        entry.isLike = true;
        break;
      }
    }
    return entry;
  });
  return resp;
}
