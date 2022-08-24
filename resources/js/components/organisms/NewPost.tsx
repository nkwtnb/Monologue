import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Message from '../atoms/Message';

// 各上限
const LIMIT = {
  // ファイルサイズ
  SIZE: 1024 * 1024 * 1,
  // ファイル数
  COUNT: 4,
  // 文字数
  STRINGS: 100,
}

interface PostMessgae  {
  words: string;
  reply_to: number | undefined;
  images?: string[] | undefined;
}

interface SelectedImage {
  data: string;
  file: any
}

interface Props {
  placeholder: string;
  replyTo?: number | undefined;
}

const postMessage = async (param: PostMessgae) => {
  const resp = await axios.post("/api/words", param);
  return resp;
}

const Button = styled.button`
width: 100px;
`;

const NewPostArea = styled.div`
background-color: #fff;
border: 1px solid #ddd;
padding: 2px 6px;
`;

const TextArea = styled.textarea`
background-color: #fff;
&:focus {
  background-color: #fff;
}
`;

const FaWrapper = styled.label`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #ddd;
  color: #2363a5;
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;

const UploadThumbnailWrapper = styled.div`
max-width: 80px;
max-height: 80px;
border: 1px solid #ddd;
display: inline-block;
margin: 2px 4px;
`;

const UploadThumbnail = styled.img`
width: 100%;
height: 100%;
`;

const ThumbnailClose = styled.button`
position: absolute;
right: 0;
border: none;
background-color: #808080ab;
color: white;
width: 20px;
height: 20px;
line-height: 0px;
border-radius: 20px;
`;

const Counter = styled.div<{isOver: boolean}>`
  ${({isOver}) => isOver && css`
    color: red;
  `}
`;

const uploadFiles = async (files: SelectedImage[], _index?: number, _uploaded?: string[]): Promise<string[]> => {
  let index = _index ? _index : 0;
  const uploaded = _uploaded ? _uploaded : [];
  const form = new FormData();
  const file: any = files[index];
  form.append('upload_file', file.file);
  const settings = { headers: { 'content-type': 'multipart/form-data' } }
  const resp = await axios.post("/api/file/upload",
    form,
    settings
  );
  uploaded.push(resp.data);
  // 再起呼び出し判定
  index++;
  if(index < files.length) {
    return await uploadFiles(files, index, uploaded);
  } else {
    return uploaded;
  }
}

export default (props: Props) => {
  const [contents, setContents] = useState("");
  const [stringsCount, setStringsCount] = useState<number>(0);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [uploads, setUploads] = useState<SelectedImage[]>([]);
  const navigate = useNavigate();
  const generateEmbedUrl = (words: string) => {
    const reg = new RegExp("\bhttps:\\/\\/www\\.youtube\\.com\\/watch\\?v=.*\b","gi");
    const myArray = reg.exec(words);
  }
  const handleChange = (e: any) => {
    generateEmbedUrl(e.target.value);
    setContents(e.target.value);
    setErrorMessages([]);
    setStringsCount(Array.from(e.target.value).length);
  }

  // const countStrings = (value: string) => {
  //   const ZWJ = 8205;
  //   let ZWJCount = 0;
  //   let count = 0;
  //   const stringArray = Array.from(value);
  //   for (let i=0; i<stringArray.length; i++) {
  //     const char = stringArray[i];
  //     count++;
  //     console.log(char.charCodeAt(0));
  //     if (char.charCodeAt(0) === ZWJ) {
  //       ZWJCount++;
  //     }
  //   }
  //   console.log(`全体 : ${count}, 制御文字 : ${ZWJCount}, 結果 : ${count - (ZWJCount*2)}`);
  //   // const spaces = (value.split(" ").length - 1);
  //   // const converted = Array.from(value);
  //   // converted.indexOf(" ");

  //   // setStringsCount();
  // }

  const handleClick = () => {
    setErrorMessages([]);
    if (contents === "") {
      setErrorMessages(["ひとりごとを入力してください。"]);
      return;
    }
    (async () => {
      try {
        let uploadedFilePaths: string[] = [];
        if (uploads.length > 0) {
          uploadedFilePaths = await uploadFiles(uploads);
        }
        const param: PostMessgae = {
          "words": contents,
          "reply_to": props.replyTo,
          "images": uploadedFilePaths
        };
        const resp = await postMessage(param);
        navigate("/");
        location.reload();
      } catch(error: any) {
        const response = error.response;
        if (response.status === 419 || response.status === 401) {
          setErrorMessages(["セッションの有効期限切れか、未ログインの状態です。\nつぶやきの投稿はログインが必要です。"]);
          return;
        }
        const errors = error.response.data.errors;
        const messages: string[] = [];
        for(let key in errors) {
          errors[key].forEach((message: string) => {
            messages.push(message);
          });
        }
        if (messages.length > 0) {
          setErrorMessages(messages);
        }
      }
    })();
  }

  const handleUploadClick = (e: any) => {
    if (uploads.length === LIMIT.COUNT) {
      e.preventDefault();
    }
  }

  const handleUploadChange = (e: any) => {
    const file = e.target!.files![0];
    if(!file) {
      return;
    }
    setErrorMessages([]);
    if (file.size > LIMIT.SIZE) {
      setErrorMessages([`サイズ上限（${LIMIT.SIZE / 1024 / 1024} MB）を超えています。`]);
      return;
    }
    const reader = new FileReader();
    reader.onload = function(loadEvent) {
      const data = loadEvent.target!.result ? loadEvent.target!.result : "";
      if (typeof data === "string") {
        setUploads([...uploads,
          {
            file: file,
            data: data
          }
        ]);
      }
    }
    reader.readAsDataURL(file);
  }

  const handleClose = (index: number) => {
    uploads.splice(index, 1);
    setUploads([...uploads]);
  }

  return (
    <>
      <div className='mt-2 mb-1'>
        <NewPostArea>
          <div className='row justify-content-center mb-2'>
            <div className="form-group">
              <TextArea style={{resize: "none", border: "none"}} className="form-control" id="words" rows={3} value={contents} onChange={handleChange} placeholder={props.placeholder} autoFocus></TextArea>
            </div>
          </div>
          <div className='row justify-content-start mb-2'>
            <div>
              {
                  uploads.map((upload, index) => {
                  return (
                    <div style={{display: "inline-block", position: "relative"}} key={index}>
                      <ThumbnailClose onClick={(() => handleClose(index))}>×</ThumbnailClose>
                      <UploadThumbnailWrapper>
                        <UploadThumbnail src={upload.data} style={{}} />
                      </UploadThumbnailWrapper>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className='row align-items-center'>
            <div className='col d-flex justify-content-start'>
              <FaWrapper className='d-flex justify-content-center align-items-center'>
                <FontAwesomeIcon className='fa-lg' icon={faImage} />
                <input type="file" className="uploader" hidden onClick={handleUploadClick} onChange={handleUploadChange} accept="image/*"></input>
              </FaWrapper>
            </div>
            <div className='col d-flex justify-content-end'>
              <Counter className={'me-2 mt-1 mb-2 d-flex align-items-center'} isOver={(stringsCount > LIMIT.STRINGS ? true : false)}>
                {stringsCount + " / " + LIMIT.STRINGS}
              </Counter>
              <div className='ml-auto mt-1 mb-2'>
                <Button className="btn btn-primary" onClick={handleClick}>投稿</Button>
              </div>
            </div>
          </div>
          <div className='row align-items-center'>
            <div className='col d-flex justify-content-start'>
              <Message type='danger' messages={errorMessages}></Message>
            </div>
          </div>
        </NewPostArea>
      </div>
    </>
  );
}