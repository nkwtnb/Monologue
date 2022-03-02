import React, { memo, useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
import axios from 'axios';
import { Entry } from "@interface/Entry";

interface Props {
  name: string | undefined;
  filter: "post" | "like" | "media";
}

export default (props: Props): JSX.Element => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    setIsLoaded(false);
    setEntries([]);
    (async () => {
      // 全投稿取得
      let resp;
      if (props.name === "") {
        resp = await axios.get(`/api/words`);
      } else {
        // 対象ユーザーのいいね
        if (props.filter === "like") {
          resp = await axios.get(`/api/words/user/${props.name}/likes`);
        // 対象ユーザーの全投稿
        } else {
          resp = await axios.get(`/api/words/user/${props.name}/posts`);
        }
      }
      const entries = resp.data;
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