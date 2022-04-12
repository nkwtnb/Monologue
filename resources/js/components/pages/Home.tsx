import React, { useContext, useEffect, useLayoutEffect } from 'react';
import NewPost from '../organisms/NewPost';
import TImeline from '../organisms/TImeline';
import { AuthContext } from "../../Context";

export default () => {
  const {authState, setAuthState} = useContext(AuthContext);
  return (
    <>
      <div className='offset-md-2 col-md-8'>
        {
          authState.name !== "" &&
          <NewPost placeholder='ひとりごとをつぶやく...'/>
        }
        <TImeline name="" filter="post"/>
      </div>
    </>
  );
}
