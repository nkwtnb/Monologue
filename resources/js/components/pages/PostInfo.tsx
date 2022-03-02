import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import TImeline from '../organisms/TImeline';
import { useParams } from 'react-router-dom';
import Post from '../organisms/Post';
import { Entry } from "@interface/Entry";
import axios from 'axios';

export default () => {
  const { postId } = useParams();
  const [entry, setEntry] = useState<Entry | undefined>();
  const [replies, setReplies] = useState<Entry[]>([]);

  useEffect(() => {
    (async () => {
      const resp = (await axios.get("/api/words/post/" + postId)).data;
      const entry: Entry = resp.entries[0];
      const replies: Entry[] = resp.replies;
      setEntry({...entry});
      setReplies([...replies]);
    })();
  }, [postId]);

  return (
    <>
      <div className='row mb-1'>
        <div className='offset-md-2 col-md-8'>
          {entry &&
            <Post
              id={entry!.id}
              avatar={entry!.avatar}
              created_at={entry!.created_at}
              isLike={entry!.isLike}
              likes={entry!.likes}
              name={entry!.name}
              images={entry!.images}
              replyCount={entry!.replyCount}
              words={entry!.words}
              ogp_title={entry!.ogp_title}
              ogp_description={entry!.ogp_description}
              ogp_image={entry!.ogp_image}
              isDialog={false}
            />
          }
        </div>
      </div>
      <div className='row'>
        <div className='offset-md-2 col-md-8'>
          {
            replies.map((reply: Entry, index) => (
                <div className='mb-1' key={index}>
                  <Post
                  id={reply.id}
                  avatar={reply!.avatar}
                  created_at={reply.created_at}
                  isLike={reply.isLike}
                  likes={reply.likes}
                  name={reply.name}
                  images={reply.images}
                  replyCount={reply.replyCount}
                  words={reply.words}
                  ogp_title={reply.ogp_title}
                  ogp_description={reply.ogp_description}
                  ogp_image={reply.ogp_image}
                  isDialog={false}
                />
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
