import React, { memo, useContext, useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
import { Entry } from "@interface/Entry";
import * as entryUtil from "@api/Entries";
import { AuthContext } from '../../Context';
import useRequest from './hooks/useRequest';

interface Props {
  name: string | undefined;
  filter: "post" | "like" | "media";
}

export default (props: Props): JSX.Element => {
  const {authState, setAuthState} = useContext(AuthContext);
  const {data, error, isLoading} = useRequest({name: props.name, filter: props.filter, authState: authState});
 
  if (isLoading) {
    return <></>;
  }
  if (data.length === 0) {
    return <div>対象の投稿がありません</div>;
  } else {
    return (
      <>
        {
          data.map((entry: Entry, index) => {
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