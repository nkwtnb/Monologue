import React, { memo, useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
import axios from 'axios';
import CommentDialog from './CommentDialog';
import { Entry } from "@interface/Entry";

interface Props {
  name: string | undefined;
  filter: "post" | "like";
}

export default (props: Props): JSX.Element => {

  const [entries, setEntries] = useState<Entry[]>([]);

  const handleLike = (e: any, id: number) => {
    let clickedEntry: Entry | undefined;
    for (let i=0; i<entries.length; i++) {
      const entry: any = entries[i];
      if (entry.id === id) {
        clickedEntry = entry;
        break;
      }
    }
    if (!clickedEntry) {
      return;
    }
    (async () => {
      if (clickedEntry.like) {
        const resp = await axios.delete("/api/likes", { data: { entryId: id } });
      } else {
        const resp = await axios.post("/api/likes", { entryId: id });
      }
      setEntries(() => {
        return entries.map(entry => {
          if (entry.id === id) {
            entry.like = !entry.like;
            entry.like ? (entry.likes++) : (entry.likes--);
          }
          return entry;
        })
      })
    })();
  }
  
  // const handleComment = (id: number) => {
  //   console.log("handlecomment " + id);
  //   const element = document.getElementById("toggle-modal-" + id);
  //   element?.click();
  // }

  useEffect(() => {
    (async () => {
      //エントリー取得
      let resp;
      if (props.name === "") {
        resp = await axios.get(`/words`);
      } else {
        if (props.filter === "like") {
          resp = await axios.get(`/words/user/${props.name}/likes`);
        } else {
          resp = await axios.get(`/words/user/${props.name}/posts`);
        }
      }
      const respLikes = await axios.get("/likes");
      const _likes = respLikes.data;
      const _entries = resp.data;
      const mapped = _entries.map((entry: any) => {
        entry.like = _likes.indexOf(entry.id) > -1 ? true : false;
        return entry;
      });
      setEntries(mapped);
    })();
  }, [props.name, props.filter]);

  return (
    <>
      {
        entries.map((entry: Entry, index) => {
          return (
            <div className='px-0' key={index}>
              <Post
                id={entry.id}
                name={entry.name}
                created_at={entry.created_at}
                avatar={entry.avatar}
                words={entry.words}
                images={entry.images}
                like={entry.like}
                likes={entry.likes}
                handleLike={handleLike}
                // handleComment={handleComment}
                replyCount={entry.replyCount}
                onDialog={false}
              />
              <CommentDialog {...entry}/>
            </div>
          )
        })
      }
    </>
  );
}