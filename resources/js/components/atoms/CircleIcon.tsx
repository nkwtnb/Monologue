import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

interface Todo {
  width?: number;
  height?: number;
  imgPath: string;
  link?: boolean;
}

const SIZE: number = 40;

export default (props: Todo): JSX.Element => {
  const Wrapper = styled.a`
    padding: 4px;
    display: inline-block;
  `;

  const Image = styled.img`
    width: ${props.width ? props.width : SIZE}px;
    height: ${props.height ? props.height : SIZE}px;
    background-color: #ddd;
    border-radius: ${SIZE}px;
  `;
  if (props.link) {
    return (
      <div className="dropleft">
        <Wrapper href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <Image className="d-flex justify-content-center align-items-center" src={props.imgPath} />
        </Wrapper>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <Link to="/user" className="dropdown-item">
            ユーザー情報
          </Link>
          <Link to="/user" className="dropdown-item">
            ログアウト
          </Link>

          {/* <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a> */}
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