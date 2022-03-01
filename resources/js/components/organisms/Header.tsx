import React, { useEffect, useState, useContext } from 'react';
import CircleIcon from '../atoms/CircleIcon';
import noAvatar from "@img/no_avatar.png";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../Context";
import { makePathForImage } from '@api/Resources';

export default () => {
  const {authState} = useContext(AuthContext);

  return (
    <nav className='container h-100 '>
      <div className="d-flex bd-highlight mb-3 h-100 align-items-center">
        <div className="me-auto p-2 bd-highlight">
          <Link to="/" className='logo'>
            Monologue
          </Link>
        </div>
        <div className="p-2 bd-highlight">
          <CircleIcon image={makePathForImage(authState.avatar, "upfiles") || noAvatar} name={authState.name} isHeader={true}/>
        </div>
      </div>
    </nav>
  );
}