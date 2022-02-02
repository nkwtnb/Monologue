import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircleIcon from '../atoms/CircleIcon';
import axios from 'axios';
// sample
import img from "@img/circle.png";
import noAvatar from "@img/no_avatar.png";
import { Link } from 'react-router-dom';

interface UserInfo {
  name: string,
  email: string,
  avatar?: string | ArrayBuffer | null,
  imgFile?: Blob | string | null,
}

const getUserInfo = async (): Promise<UserInfo | undefined> => {
  try {
    const userInfo = await axios.post("/user/get");
    return userInfo.data;
  } catch (error) {
    console.log(error);
  }
}

export default () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    avatar: "",
    imgFile: "",
  });

  useEffect(() => {
    (async () => {
      const currentUserInfo = await getUserInfo();
      console.log(currentUserInfo);
      setUserInfo({ ...userInfo, ...currentUserInfo });
    })();    
  }, []);

  return (
    <nav className='container h-100'>
      <div className="d-flex bd-highlight mb-3 h-100">
        <div className="me-auto p-2 bd-highlight">
          <Link to="/" className='logo'>
            Monologue
          </Link>
        </div>
        <div className="p-2 bd-highlight">
          <CircleIcon imgPath={userInfo?.avatar || noAvatar} name={userInfo.name}/>
        </div>
      </div>
    </nav>
  );
}