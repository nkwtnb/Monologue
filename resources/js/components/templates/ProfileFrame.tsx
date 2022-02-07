import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.span`
  border: 1px solid #ddd;
  &:hover {
    background-color: #ddd;
  }
`;

export default () => {
  return (
    <>
      <div className='row'>
        <div className='offset-md-2 col-md-8'>
          <div className="row">
            <Header className="col d-flex justify-content-center">
              <NavLink to=".">投稿</NavLink>
            </Header>
            <Header className="col d-flex justify-content-center">
              <NavLink to="./like">いいね</NavLink>
            </Header>
          </div>
          <div className="row">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
