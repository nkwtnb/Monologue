import React from 'react';
import styled from 'styled-components';
import CircleIcon from '../atoms/CircleIcon';
// sample
import img from "@img/circle.png";
import userIcon from "@img/userIcon.png";

export default () => {
  const Header = styled.nav`
    height: 60px;
  `;

  return (
    <Header className='container'>
      <div>
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-2 bd-highlight">
            <CircleIcon imgPath={img} />
          </div>
          <div className="p-2 bd-highlight">
            {/* <CircleIcon imgPath={img} /> */}
            <CircleIcon imgPath={userIcon} link={true}/>
          </div>
        </div>
      </div>

    </Header>
  );
}