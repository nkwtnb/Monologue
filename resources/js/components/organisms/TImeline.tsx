import React, { useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
import axios from 'axios';

interface Props {
  name: string | undefined;
  filter: "post" | "like";
}

export default (props: Props): JSX.Element => {

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
  console.log("filter : " + props.filter);
  
  useEffect(() => {
    console.log("name : " + props.name);

    (async () => {
      //エントリー取得
      let resp;
      if (props.name === "") {
        resp = await axios.get(`/words`);
      } else {
        let filterString = "";
        if (props.filter === "like") {
          filterString = "/?filter=" + props.filter;
        }
        resp = await axios.get(`/words/${props.name}${filterString}`);
      }
      const _entries = resp.data;
      console.log(_entries);
      setEntries([..._entries]);
      //いいね取得
      const respLikes = await axios.get("/likes");
      const _likes = respLikes.data;
      setLikes([...likes, ..._likes]);  
    })();
  }, [props.name, props.filter]);

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