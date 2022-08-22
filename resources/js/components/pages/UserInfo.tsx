import axios from 'axios';
import React, { useContext } from 'react';
// Components
import CircleIcon from '../atoms/CircleIcon';
import NoAvatar from "../../../img/no_avatar.png";
import ErrorMessage from '../atoms/ErrorMessage';
import { useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from "../../Context";
import * as userApi from "../../api/User";
import { Navigate, useNavigate } from 'react-router-dom';
import { makePathForImage } from '@api/Resources';

/**
 * ユーザー情報更新
 * @param param 
 * @returns 
 */
const postUserInfo = async (param: userApi.Type) => {
  return await axios.put("/api/user", param);
}

const AvatarArea = styled.div`
position: relative;
`;

const AvatarDeleteButton = styled.button`
position: absolute;
right: 0;
top: 0;
background-color: #a5a3a387;
border: none;
width: 20px;
height: 20px;
line-height: 20px;
border-radius: 10px;
`;


const FileControlButton = styled.span`
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

interface UserInfo extends userApi.Type{
  currentAvatar?: string | null;
}

export default () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    ...authState,
    currentAvatar: makePathForImage(authState.avatar, "upfiles")
  });
  const [error, setError] = useState<string[]>([]);
  const [leave, setLeave] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleError = (error: any) => {
    console.log(error);
    const messages: string[] = [];
    if (error.errors) {
      for(let key in error.errors) {
        messages.push(error.errors[key]);
      }
    } else if (error.message) {
      messages.push(error.message);
    }
    setError(messages);
  }
  const leaveUser = async () => {
    const resp = (await axios.delete("/api/user")).data;
    return resp;
  };

  const handleClick = () => {
    setError([]);
    const message = document.getElementById("alert");
    message?.setAttribute("style", "display: none");
    (async () => {
      try {
        const filePath = await upload();
        const resp = await postUserInfo({
          "name": userInfo.name,  
          "email": userInfo.email,
          "avatar": filePath ? filePath : userInfo.avatar,
          "message": userInfo.message,
        });
        window.location.reload();
      } catch(e: any) {
        handleError(e.response.data);
        return;
      }
    })();
  }

  const handleLeave = () => {
    if (!leave) {
      setLeave(true);
      return;
    }
    (async () => {
      setError([]);
      try {
        const resp = await leaveUser();
        navigate("/register");
      } catch (e: any) {
        handleError(e.response.data);
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

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target!.files![0];
    if(!file) {
      return;
    }
    if (file.size > 102400) {
      setError(["ファイルサイズは100kb以下にしてください"]);
      return;
    }
    // プロフィール画像変更
    const reader = new FileReader();
    reader.onload = function(loadEvent) {
      setUserInfo(
        {
          ...userInfo,
          "currentAvatar": loadEvent.target!.result as string,
          "imgFile": file
        }
      )
    }
    reader.readAsDataURL(file);
  }
  
  const handleAvatarDelete = () => {
    setUserInfo({
      ...userInfo,
      currentAvatar: "",
      avatar: "",
      imgFile: "",
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, target: string) => {
    setUserInfo({ ...userInfo, [target]: e.target.value });
    return;
  };

  const triggerUpload = () => {
    document.getElementById("avatar")?.click();
  }

  // ログイン済みの場合、リダイレクト
  if (!authState.name) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='container'>
            <div className='mt-3 row justify-content-left align-items-start'>
              <div className='col-md-4'>
                プロフィール写真
              </div>
              <div className='col-md-1' style={{width: "80px"}}>
                <AvatarArea>
                  {/* アバターが設定されている場合、クリアボタンの描画 */}
                  {
                    userInfo.currentAvatar
                    ?
                      <AvatarDeleteButton onClick={handleAvatarDelete}>×</AvatarDeleteButton>
                    :
                      <></>
                  }
                  <CircleIcon image={userInfo.currentAvatar || NoAvatar} />
                </AvatarArea>
              </div>
              <div className='col-md-1 flex-grow-1'>
                <a>
                  <FileControlButton className="file-upload btn btn-info" onClick={triggerUpload} >参照</FileControlButton>
                  <FileUploaderLabel>png,jpeg,jpg,gif形式（100KBまで）</FileUploaderLabel>
                  <div className='file-upload-wrapper' hidden>
                    <input type="file" id="avatar" accept=".png, .jpeg, .jpg, .gif" onChange={((e) => handleUploadChange(e))}></input>
                  </div>
                </a>
              </div>
            </div>
            <div className='mt-3 row justify-content-center align-items-start'>
              <div className='col-md-4'>ユーザー名</div>
              <div className='col-md flex-grow-1'>
                <input className="w-100 form-control" type="text" value={userInfo.name} onChange={((e) => handleChange(e, "name"))}></input>
              </div>
            </div>
            <div className='mt-3 row justify-content-center align-items-start'>
              <div className='col-md-4'>一言メッセージ</div>
              <div className='col-md flex-grow-1'>
                <textarea className="w-100 form-control" value={userInfo.message || ""} onChange={((e) => handleChange(e, "message"))} />
              </div>
            </div>
            <div className='mt-3 row justify-content-center align-items-start'>
              <div className='col-md-4'>メールアドレス</div>
              <div className='col-md flex-grow-1'>
                <input className="w-100 form-control" type="text" value={userInfo.email} onChange={((e) => handleChange(e, "email"))}></input>
              </div>
            </div>
            <div className='mt-5 row justify-content-center'>
              <div className='col-md-8 flex-grow-1'>
                <div className='d-flex'>
                  <div className='col d-flex justify-content-start'>
                    {
                      leave === false ?
                        <button className="btn btn-danger" onClick={handleLeave}>退会</button>
                      :
                        <>
                          <div className="form-check d-flex align-items-center me-2">
                            <div className='d-flex align-items-center'>
                              <input className="form-check-input" type="checkbox" value="confirmed" id="confirm-check" onChange={(() => setConfirmed(pre => !pre))}/>
                            </div>
                            <label className="form-check-label" htmlFor="confirm-check">本当に退会しますか？</label>
                          </div>
                          <button className="btn btn-danger" onClick={handleLeave} disabled={!confirmed}>退会</button>
                        </>
                    }
                  </div>
                  <div className='col d-flex justify-content-end'>
                    <button className="btn btn-primary" onClick={handleClick}>保存</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-3 row justify-content-center'>
              <div className='col flex-grow-1'>
                <ErrorMessage messages={error}></ErrorMessage>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
