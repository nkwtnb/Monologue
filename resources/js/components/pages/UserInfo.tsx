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
import { useHandleError } from '../../hooks/useHandleError';
import { FileUploader } from '../organisms/FileUploader';

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
  const {error, setError, handleError} = useHandleError();
  const [withdrawal, setWithdrawal] = useState({ checked: false, confirmed: false});

  const handleClick = () => {
    setError([]);
    const message = document.getElementById("alert");
    message?.setAttribute("style", "display: none");
    (async () => {
      try {
        let filePath;
        if (userInfo.imgFile) {
          filePath = await userApi.postAvatar(userInfo.imgFile);
        }
        await userApi.postUserInfo({
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
    if (!withdrawal.checked) {
      setWithdrawal({
        ...withdrawal,
        checked: true
      });
      return;
    }
    (async () => {
      setError([]);
      try {
        await userApi.withdrawUser();
        navigate("/register");
      } catch (e: any) {
        handleError(e.response.data);
      }
    })();
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
                <FileUploader acceptType={["png", "jpeg", "jpg", "gif"]} onChange={((e) => handleUploadChange(e))} />
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
                      withdrawal.checked === false ?
                        <button className="btn btn-danger" onClick={handleLeave}>退会</button>
                      :
                        <>
                          <div className="form-check d-flex align-items-center me-2">
                            <div className='d-flex align-items-center'>
                              <input className="form-check-input" type="checkbox" value="confirmed" id="confirm-check" onChange={(() => setWithdrawal({...withdrawal, confirmed: !withdrawal.confirmed}))}/>
                            </div>
                            <label className="form-check-label" htmlFor="confirm-check">本当に退会しますか？</label>
                          </div>
                          <button className="btn btn-danger" onClick={handleLeave} disabled={!withdrawal.confirmed}>退会</button>
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
