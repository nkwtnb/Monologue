import React, { useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
import axios from 'axios';

export default (): JSX.Element => {

  interface Entry {
    name: string,
    id: number,
    avatar: string,
    words: string;
    created_at: string;
    likes: number;
    like: boolean;
  }
  
  const [entries, setEntries] = useState<Entry[]>([]);
  const [likes, setLikes] = useState<number[]>([])
  
  useLayoutEffect(() => {
    (async () => {
      //エントリー取得
      const resp = await axios.get("/words");
      const _entries = resp.data;
      setEntries([...entries, ..._entries]);
      //いいね取得
      const respLikes = await axios.get("/likes");
      const _likes = respLikes.data;
      setLikes([...likes, ..._likes]);  
      console.log("layout effect");
    })();
  }, []);

  return (
    <>
      {
        entries.map((entry: Entry, index) => (
          <Post
            id={entry.id}
            name={entry.name}
            created_at={entry.created_at}
            avatar={entry.avatar}
            words={entry.words}
            like={likes.indexOf(entry.id) === -1 ? false : true}
            likes={entry.likes}
            key={index}
          />
        ))
      }
    </>
  );
}