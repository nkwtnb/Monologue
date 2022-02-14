import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.span`
  border: 1px solid #ddd;
  &:hover {
    background-color: #ddd;
  }
`;

export default (props: any) => {
  const [isDone, setIsDone] = useState(true);

  return (
    <>
      <div className='row'>
        <div className='offset-md-2 col-md-8'>
          <div className="row">
              <Header className="col-6 d-flex justify-content-center">
                <NavLink to=".">投稿</NavLink>
              </Header>
              <Header className="col-6 d-flex justify-content-center">
                <NavLink to="./like">いいね</NavLink>
              </Header>
          </div>
          <div className="row">
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
