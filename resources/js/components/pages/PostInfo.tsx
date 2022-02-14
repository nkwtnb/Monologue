import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import TImeline from '../organisms/TImeline';
import { useParams } from 'react-router-dom';
import Post from '../organisms/Post';
import { Entry } from "@interface/Entry";
import axios from 'axios';
import CommentDialog from '../organisms/CommentDialog';

export default () => {
  const { postId } = useParams();
  const [entry, setEntry] = useState<Entry>({
    id: 0,
    name: "",
    avatar: "",
    created_at: "",
    like: false,
    likes: 0,
    words: "",
    replyCount: 0,
    images: []
  });
  const [replies, setReplies] = useState<Entry[]>([]);

  useLayoutEffect(() => {
    (async () => {
      const resp = (await axios.get("/words/post/" + postId)).data;
      const entry: Entry = resp.entries[0];
      const replies: Entry[] = resp.replies;
      console.log(replies);
      setEntry({...entry});
      setReplies([...replies]);
    })();
  }, [postId]);

  return (
    <>
      <div className='row'>
        <div className='offset-md-2 col-md-8'>
          <Post
            id={entry!.id}
            avatar={entry!.avatar}
            created_at={entry!.created_at}
            like={entry!.like}
            likes={entry!.likes}
            name={entry!.name}
            images={entry!.images}
            replyCount={entry!.replyCount}
            words={entry!.words}
            onDialog={false}
            handleComment={null}
            handleLike={null}
          />
          <CommentDialog {...entry}/>
        </div>
      </div>
      <div className='row'>
        <div className='offset-md-2 col-md-8'>
          {
            replies.map((reply: Entry, index) => (
                <div key={index}>
                  <Post
                  id={reply.id}
                  avatar={reply!.avatar}
                  created_at={reply.created_at}
                  like={reply.like}
                  likes={reply.likes}
                  name={reply.name}
                  images={reply.images}
                  replyCount={reply.replyCount}
                  words={reply.words}
                  onDialog={false}
                  handleComment={null}
                  handleLike={null}
                />
                <CommentDialog {...reply}/>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
