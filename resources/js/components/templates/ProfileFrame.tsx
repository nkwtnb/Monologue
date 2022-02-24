import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { User } from '@interface/User';
import UserProfile from '../organisms/UserProfile';
// import { NoAvatar } from "@img/no_avatar"; 
import noAvatar from "@img/no_avatar.png";
import { makePathForImage } from '@api/Resources';

const Header = styled.span`
  border: 1px solid #ddd;
  &:hover {
    background-color: #ddd;
  }
`;

export default (props: any) => {
  const [isDone, setIsDone] = useState(true);
  const { name } = useParams();
  const [user, setUser] = useState<User>({
    email: "",
    message: "",
    name: "",
    avatar: noAvatar
  });

  useEffect(() => {
    (async () => {
      const resp: User = (await axios.get("/api/user/" + name)).data;
      setUser({
        ...resp,
        avatar: resp.avatar ? makePathForImage(resp.avatar, "upfiles") : noAvatar
      });
    })();
  }, [name]);

  return (
    <>
      <div className='row'>
        <div className='offset-md-2 col-md-8'>
          <div className="row mb-1">
            <UserProfile user={user} />
          </div>
          <div className="row mb-1">
            <Header className="col-4 d-flex justify-content-center">
              <NavLink className={"w-100 user-profile-tab"} end to="." style={{textAlign: "center"}}>投稿</NavLink>
            </Header>
            <Header className="col-4 d-flex justify-content-center">
              <NavLink className={"w-100 user-profile-tab"} to="./like" style={{textAlign: "center"}}>いいね</NavLink>
            </Header>
            <Header className="col-4 d-flex justify-content-center">
              <NavLink className={"w-100 user-profile-tab"} to="./media" style={{textAlign: "center"}}>メディア</NavLink>
            </Header>
          </div>
          <div className="row mb-1">
            {
              isDone &&
              <Outlet />
            }
          </div>
        </div>
      </div>
    </>
  );
}
