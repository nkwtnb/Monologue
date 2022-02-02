import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Todo {
  width?: number;
  height?: number;
  imgPath: string;
  name?: string;
}

const SIZE: number = 40;

const Wrapper = styled.a`
padding: 4px;
display: inline-block;
`;

const UserName = styled.span`
font-size: 15px;
color: white;
font-weight: bold;
`;

const Image = styled.img`
width: ${props => props.width ? props.width : SIZE}px;
height: ${props => props.height ? props.height : SIZE}px;
background-color: #ddd;
border-radius: ${SIZE}px;
`;

export default (props: Todo): JSX.Element => {
  
  const handleClick = async () => {
    const resp = await axios.post("/logout");
    if (resp.status === 204) {
      window.location.reload();
    } else {
      alert("ログアウト処理に失敗しました。");
    }
  };

  // ユーザー情報の場合
  if (props.name !== "") {
    return (
      <div className="dropleft d-flex justify-content-center align-items-center">
        <UserName className="me-2">{props.name}</UserName>
        <Wrapper href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <Image className="d-flex justify-content-center align-items-center" src={props.imgPath} />
        </Wrapper>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <Link to="/user" className="dropdown-item">
            ユーザー情報
          </Link>
          <div className="dropdown-item" onClick={handleClick}>
            ログアウト
          </div>
        </div>
      </div >
    );
  } else {
    return (
      <Wrapper>
        <Image className="d-flex justify-content-center align-items-center" src={props.imgPath} />
      </Wrapper>
    );
  }
}