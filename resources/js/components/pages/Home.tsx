import React, { useContext, useEffect, useLayoutEffect } from 'react';
import NewPost from '../organisms/NewPost';
import Timeline from '../organisms/Timeline';
import { AuthContext } from "../../Context";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Message from '../atoms/Message';

export default () => {
  const {authState, setAuthState} = useContext(AuthContext);
  return (
    <>
      <div className='offset-md-2 col-md-8'>
        {
          authState.name !== ""
          ?
            <NewPost placeholder='ひとりごとをつぶやく...'/>
          :
            <div className='mb-1'>
              <Message type='warning'>
                <b>投稿</b>、<b>コメント</b>、<b>いいね</b>などのアクションをするには、<Link to="/login">ログイン</Link>が必要です。
              </Message>
            </div>
        }
        <Timeline name="" filter="post"/>
      </div>
    </>
  );
}
