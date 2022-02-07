import axios from 'axios';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
// Components
import CircleIcon from '../atoms/CircleIcon';
import NoAvatar from "../../../img/no_avatar.png";
import ErrorMessage from '../atoms/ErrorMessage';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from "../../Context";
import * as userApi from "../../api/User";
import { useParams } from 'react-router-dom';

/**
 * ユーザー情報更新
 * @param param 
 * @returns 
 */
const postUserInfo = async (param: userApi.Type) => {
  return await axios.put("api/user", param);
}

const FileUploader = styled.span`
border: 1px solid #ddd;
padding: 4px 12px;
border-radius: 4px;
font-size: 12px;
color: white;
`;

const FileUploaderLabel = styled.span`
display: inline-block;
font-size: 13px;
white-space: nowrap;
`;

export default () => {

  const { name } = useParams();
  console.log("user id : " + name);
  const { authState, setAuthState } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<userApi.Type>(authState)
  const [error, setError] = useState([]);

  const handleClick = () => {
    console.log("handleClick");
    console.log(userInfo);
    const message = document.getElementById("alert");
    message?.setAttribute("style", "display: none");
    (async () => {
    try {
      const filePath = await upload();
      const resp = await postUserInfo({
        "name": userInfo.name,  
        "email": userInfo.email,
        "avatar": filePath ? filePath : userInfo.avatar,
      });
      window.location.reload();
    } catch(e: any) {
      const error = e.response.data;
      const element = document.getElementById("alert");
      element?.setAttribute("style", "display: block");
      if (error.errors) {
        setError(error);
      }
      return;
    }
    })();
  }

  const upload = async () => {
    if (!userInfo.imgFile) {
      return await null;
    }
    const form = new FormData();
    const file = userInfo.imgFile;
    form.append('upload_file', file);
    const settings = { headers: { 'content-type': 'multipart/form-data' } }
    const resp = await axios.post("api/file/upload",
      form,
      settings
    );
    return resp.data;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, target: string) => {
    if (target !== "avatar") {
      setUserInfo({ ...userInfo, [target]: e.target.value });
      return;
    }
    const file = e.target!.files![0];
    if(!file) {
      return;
    }
    if (file.size > 102400) {
      alert("ファイルサイズは100kb以下にしてください");
      return;
    }
    // プロフィール画像変更
    const reader = new FileReader();
    reader.onload = function(loadEvent) {
      setUserInfo(
        {
          ...userInfo,
          "avatar": loadEvent.target!.result,
          "imgFile": file
        }
      )
    }
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    document.getElementById("avatar")?.click();
  }

  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='container'>
            <div className='mt-3 row justify-content-center align-items-end'>
              <div className='col-md-4'>
                プロフィール写真
              </div>
              <div className='col-md-1'>
                <CircleIcon imgPath={userInfo.avatar || NoAvatar} />
              </div>
              <div className='col-md-3'>
                <a>
                  <FileUploader className="file-upload btn btn-info" onClick={triggerUpload} >参照</FileUploader>
                  <FileUploaderLabel>png,jpeg,jpg,gif形式（100KBまで）</FileUploaderLabel>
                  <div className='file-upload-wrapper' hidden>
                    <input type="file" id="avatar" accept=".png, .jpeg, .jpg, .gif" onChange={((e) => handleChange(e, "avatar"))}></input>
                  </div>
                </a>
              </div>
            </div>
            <div className='mt-3 row justify-content-center align-items-end'>
              <div className='col-md-4'>
                ユーザー名
              </div>
              <div className='col-md-4'>
                <input className="w-100 form-control" type="text" value={userInfo.name} onChange={((e) => handleChange(e, "name"))}></input>
              </div>
            </div>
            <div className='mt-3 row justify-content-center align-items-end'>
              <div className='col-md-4'>
                メールアドレス
              </div>
              <div className='col-md-4'>
                <input className="w-100 form-control" type="text" value={userInfo.email} onChange={((e) => handleChange(e, "email"))}></input>
              </div>
            </div>
            <div className='mt-3 row justify-content-center'>
              <div className='col-md-8'>
                <div className='w-100'>
                  <ErrorMessage type="alert" error={error}></ErrorMessage>
                </div>
              </div>
            </div>
            <div className='mt-5 row justify-content-center'>
              <div className='col-md-8'>
                <div className='d-flex justify-content-end'>
                  <button className="btn btn-primary" onClick={handleClick}>保存</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
