import React, { useContext, useEffect, useLayoutEffect } from 'react';
import NewPost from '../organisms/NewPost';
import TImeline from '../organisms/TImeline';
import { AuthContext } from "../../Context";

export default () => {
  const {authState, setAuthState} = useContext(AuthContext);
  return (
    <>
      {
        authState.name !== "" &&
        <NewPost />
      }
      <TImeline />
    </>
  );
}
