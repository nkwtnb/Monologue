import React, { useContext, useEffect, useLayoutEffect } from 'react';
import NewPost from '../organisms/NewPost';
import TImeline from '../organisms/TImeline';
import { AuthContext } from "../../Context";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
            <div className="alert alert-warning" role="alert">
              <b>投稿</b>、<b>コメント</b>、<b>いいね</b>などのアクションをするには、<Link to="/login">ログイン</Link>が必要です。
            </div>
        }
        <TImeline name="" filter="post"/>
      </div>
    </>
  );
}
