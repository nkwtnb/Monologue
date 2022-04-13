import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import TImeline from '../organisms/TImeline';
import { useParams } from 'react-router-dom';
import Post from '../organisms/Post';
import { Entry } from "@interface/Entry";
import * as entryUtil from "@api/Entries";
import axios from 'axios';
import { AuthContext } from '../../Context';
import styled from 'styled-components';

const BeginComments = styled.div`
  border: 1px solid #dddd;
  padding: 8px;
  background-color: #ffffff;
  font-weight: bold;
`;

export default () => {
  const { postId } = useParams();
  const [entry, setEntry] = useState<Entry | undefined>();
  const [replies, setReplies] = useState<Entry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const {authState, setAuthState} = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const resp = await entryUtil.getEntry(postId);
      const _postWithReplies = [resp.entry].concat(resp.replies);
      const postWithReplies = await entryUtil.setLikeStatus(_postWithReplies, authState.name);
      // 先頭要素は対象の投稿
      const entry: Entry = postWithReplies[0];
      // 2要素目以降は対象の投稿へのリプライ
      const replies: Entry[] = postWithReplies.slice(1);
      setEntry({...entry});
      setReplies([...replies]);
      setLoaded(true);
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
            loaded &&
            <BeginComments className='mb-1'>
              コメント一覧
            </BeginComments>
          }
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
