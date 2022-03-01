import React, { useContext, useEffect, useLayoutEffect } from 'react';
import NewPost from '../organisms/NewPost';
import TImeline from '../organisms/TImeline';
import { AuthContext } from "../../Context";
import { Outlet } from 'react-router-dom';

export default () => {
  const {authState, setAuthState} = useContext(AuthContext);
  return (
    <>
      <div className='offset-md-2 col-md-8'>
        {
          authState.name !== "" &&
          <NewPost caption='ひとりごとをつぶやく...'/>
        }
        <TImeline name="" filter="post"/>
      </div>
    </>
  );
}
