import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
// Components
import CircleIcon from './atoms/CircleIcon';
import NoAvatar from "../../img/no_avatar.png";
import { useState } from 'react';
import { useEffect } from 'react';

interface UserInfo {
  name: string,
  email: string,
  avatar?: string | ArrayBuffer | null,
  imgFile?: Blob | string | null,
}
const getUserInfo = async (): Promise<UserInfo | undefined> => {
  try {
    const userInfo = await axios.post("/user/get");
    return userInfo.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * ユーザー情報更新
 * @param param 
 * @returns 
 */
const postUserInfo = async (param: UserInfo) => {
  try {
    return await axios.post("/user/put", param);
  } catch (error) {
    console.log(error);
  }
}

export default () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    avatar: "",
    imgFile: "",
  });

  /**
   * 初期化
   */
  useEffect(() => {
    (async () => {
      const currentUserInfo = await getUserInfo();
      console.log(currentUserInfo);
      setUserInfo({ ...userInfo, ...currentUserInfo });
    })();
  }, [])

  const handleClick = () => {
    (async () => {
      const filePath = await upload();
      const resp = await postUserInfo({
        "name": userInfo.name,
        "email": userInfo.email,
        "avatar": filePath ? filePath : userInfo.avatar,
      });
      console.log(resp);
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
    const resp = await axios.post("/file/upload",
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

  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-4'>
                プロフィール写真
              </div>
              <div className='col-md-1'>
                {/* <CircleIcon imgPath={NoAvatar} /> */}
                <CircleIcon imgPath={userInfo.avatar || NoAvatar} />
              </div>
              <div className='col-md-3'>
                <input type="file" id="avatar" onChange={((e) => handleChange(e, "avatar"))}></input>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-md-4'>
                ユーザー名
              </div>
              <div className='col-md-4'>
                <input className="w-100" type="text" value={userInfo.name} onChange={((e) => handleChange(e, "name"))}></input>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-md-4'>
                メールアドレス
              </div>
              <div className='col-md-4'>
                <input className="w-100" type="text" value={userInfo.email} onChange={((e) => handleChange(e, "email"))}></input>
              </div>
            </div>
            <div className='row justify-content-center mt-5'>
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
