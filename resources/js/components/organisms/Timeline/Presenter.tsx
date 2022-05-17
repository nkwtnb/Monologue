import React from 'react';
import Post from '../Post';
import { Entry } from "@interface/Entry";

interface Props {
  isLoading: boolean
  data: Entry[]
  error?: any
}

export default (props: Props): JSX.Element => {
  if (props.isLoading) {
    return <span data-testid="loading">読み込み中</span>;
  }
  if (props.data.length === 0) {
    return <div data-testid="no-data">対象の投稿がありません</div>;
  } else {
    return (
      <>
        {
          props.data.map((entry: Entry, index) => {
            return (
              <div data-testid="post" className='px-0 mb-1' key={index}>
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
