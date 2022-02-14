import styled from "styled-components";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context";

interface Props {
  width?: number;
  height?: number;
  imgPath: string;
  name?: string;
  isHeader?: boolean;
}

const SIZE: number = 40;

const Wrapper = styled.span`
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

export default (props: Props): JSX.Element => {

  const navigate = useNavigate();
  const { authState, setAuthState }= useContext(AuthContext);
  
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

  // ユーザー情報の場合
  if (props.isHeader) {
    return (
      <div className="dropleft d-flex justify-content-center align-items-center">
        <UserName className="me-2">{props.name}</UserName>
        <Wrapper role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <Image className="d-flex justify-content-center align-items-center" src={props.imgPath} />
        </Wrapper>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {
            authState.name ?
            <>
              <Link to={"/user/" + authState.name} className="dropdown-item">
                ユーザー情報
              </Link>
              <Link to="/settings" className="dropdown-item">
                設定
              </Link>
              <div className="dropdown-item" onClick={handleClick}>
                ログアウト
              </div>
            </>
            :
            <>
              <Link to="/register" className="dropdown-item">
                ユーザー登録
              </Link>
              <Link to="/login" className="dropdown-item">
                ログイン
              </Link>
            </>
          }
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