import styled from "styled-components";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context";

interface Props {
  width?: number;
  height?: number;
  image: string;
  name?: string;
}

const SIZE: number = 40;

const Wrapper = styled.span`
padding: 2px;
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

export default (props: Props): JSX.Element => {

  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const handleClick = async () => {
    const resp = await axios.post("/logout");
    if (resp.status === 204) {
      setAuthState({
        name: "",
        email: "",
        avatar: "",
        imgFile: ""
      });
      navigate("/login");
    } else {
      alert("ログアウト処理に失敗しました。");
    }
  };

  return (
    <div data-testid="circle-icon" className="circle-icon-header dropleft d-flex justify-content-center align-items-center">
      <UserName data-testid="username" className="me-2">{props.name}</UserName>
      <Wrapper role="button" data-testid="circle-icon-menu" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <Image className="d-flex justify-content-center align-items-center" src={props.image} />
      </Wrapper>
      <div className="dropdown-menu" data-testid="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {
          authState.name ?
            <>
              <Link to={"/user/" + authState.name} className="dropdown-item" data-testid="user-info">
                ユーザー情報
              </Link>
              <Link to="/settings" className="dropdown-item" data-testid="config">
                設定
              </Link>
              <div className="dropdown-item" onClick={handleClick} data-testid="logout">
                ログアウト
              </div>
            </>
            :
            <>
              <Link to="/register" className="dropdown-item" data-testid="register">
                ユーザー登録
              </Link>
              <Link to="/login" className="dropdown-item" data-testid="login">
                ログイン
              </Link>
            </>
        }
      </div>
    </div >
  );
}