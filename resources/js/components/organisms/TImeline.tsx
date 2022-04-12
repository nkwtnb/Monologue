import React, { memo, useContext, useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
import axios from 'axios';
import { Entry } from "@interface/Entry";
import { AuthContext } from '../../Context';

interface Props {
  name: string | undefined;
  filter: "post" | "like" | "media";
}

/**
 * パラメータに応じて、全投稿、いいねした投稿などを取得する
 */
const getEntries = async ({name, filter}: Props): Promise<Entry[]> => {
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
 * 自分が「いいね」した投稿にフラグを立てる
 * @returns 
 */
const setLikeStatus = async (entries: Entry[], authName: string) => {
  const likeEntries = authName === "" ? [] : (await axios.get(`/api/words/user/${authName}/likes`)).data as Entry[];
  const resp = entries.map(entry => {
    for (let i=0; i<likeEntries.length; i++) {
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

export default (props: Props): JSX.Element => {
  const {authState, setAuthState} = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    setIsLoaded(false);
    setEntries([]);
    (async () => {
      const _entries = await getEntries(props);
      const entries = await setLikeStatus(_entries, authState.name);
      setEntries(entries);
      setIsLoaded(true);
    })();
  }, [props.name, props.filter]);

  if (!isLoaded) {
    return <></>;
  }
  if (entries.length === 0) {
    return <div>対象の投稿がありません</div>;
  } else {
    return (
      <>
        {
          entries.map((entry: Entry, index) => {
            return (
              <div className='px-0 mb-1' key={index}>
                <Post
                  id={entry.id}
                  name={entry.name}
                  created_at={entry.created_at}
                  avatar={entry.avatar}
                  words={entry.words}
                  ogp_title={entry.ogp_title}
                  ogp_description={entry.ogp_description}
                  ogp_image={entry.ogp_image}
                  images={entry.images}
                  isLike={entry.isLike}
                  likes={entry.likes}
                  replyCount={entry.replyCount}
                  isDialog={false}
                />
              </div>
            )
          })
      }
      </>
    );
  }
}