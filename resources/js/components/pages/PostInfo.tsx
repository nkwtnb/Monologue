import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
      if (resp.entry.length === 0) {
        setEntry(undefined);
        setReplies([]);
        setLoaded(true);
        return;
      }
      const _postWithReplies = resp.entry.concat(resp.replies);
      const likeEntries = await entryUtil.getLikes(authState.name);
      const postWithReplies = entryUtil.setLikeStatus(_postWithReplies, likeEntries);
      // 先頭要素は対象の投稿
      const entry: Entry = postWithReplies[0];
      // 2要素目以降は対象の投稿へのリプライ
      const replies: Entry[] = postWithReplies.slice(1);
      setEntry({...entry});
      setReplies([...replies]);
      setLoaded(true);
    })();
  }, [postId]);

  if (!loaded) {
    return <></>;
  }

  return (
    <>
      {
        !entry
        ?
        <div className="alert alert-danger" role="alert">
          対象の投稿がありません。
        </div>
        :
        <>
          <div className='row mb-1'>
            <div className='offset-md-2 col-md-8'>
              <Post
                id={entry.id}
                avatar={entry.avatar}
                created_at={entry.created_at}
                isLike={entry.isLike}
                likes={entry.likes}
                name={entry.name}
                images={entry.images}
                replyCount={entry.replyCount}
                words={entry.words}
                ogp_title={entry.ogp_title}
                ogp_description={entry.ogp_description}
                ogp_image={entry.ogp_image}
                isDialog={false}
              />
            </div>
          </div>
          <div className='row'>
            <div className='offset-md-2 col-md-8'>
              <BeginComments className='mb-1'>
                コメント一覧
              </BeginComments>
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
      }
    </>
  );
}
