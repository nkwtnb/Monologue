import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircleIcon from '../atoms/CircleIcon';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import axios from 'axios';

// 各上限
const LIMIT = {
  // ファイルサイズ
  SIZE: 1024 * 1024 * 1,
  // ファイル数
  COUNT: 4
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
  replyTo?: number | undefined;
}

const postMessage = async (param: PostMessgae) => {
  const resp = await axios.post("api/words", param);
  return resp;
}

const Button = styled.button`
width: 100px;
`;

const NewPostArea = styled.div`
border: 1px solid #ddd;
padding: 2px 6px;
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

const uploadFiles = async (files: SelectedImage[], _index?: number, _uploaded?: string[]): Promise<string[]> => {
  let index = _index ? _index : 0;
  const uploaded = _uploaded ? _uploaded : [];
  const form = new FormData();
  const file: any = files[index];
  console.log(file);
  form.append('upload_file', file.file);
  const settings = { headers: { 'content-type': 'multipart/form-data' } }
  const resp = await axios.post("api/file/upload",
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
  const [uploads, setUploads] = useState<SelectedImage[]>([]);
  const generateEmbedUrl = (words: string) => {
    const reg = new RegExp("\bhttps:\\/\\/www\\.youtube\\.com\\/watch\\?v=.*\b","gi");
    // const reg = new RegExp("https.*","gi");
    const myArray = reg.exec(words);
    console.log(myArray);
    // props.words
  }
  const handleChange = (e: any) => {
    generateEmbedUrl(e.target.value);
    setContents(e.target.value);
  }

  const handleClick = () => {
    if (contents === "") {
      return;
    }
    (async () => {
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
      window.location.reload();
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
    if (file.size > LIMIT.SIZE) {
      alert("サイズ上限を超えています。");
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
      <div className='mt-2 mb-2'>
        <label >ひとりごとをつぶやく…</label>
        <NewPostArea>
          <div className='row justify-content-center mb-2'>
            <div className="form-group">
              <textarea style={{resize: "none", border: "none"}} className="form-control" id="words" rows={3} value={contents} onChange={handleChange} ></textarea>
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
                <input type="file" className="uploader" hidden onClick={handleUploadClick} onChange={handleUploadChange}></input>
              </FaWrapper>
            </div>
            <div className='col d-flex justify-content-end'>
              <div className='ml-auto mt-1 mb-2'>
                <Button className="btn btn-primary" onClick={handleClick}>つぶやく</Button>
              </div>
            </div>
          </div>
        </NewPostArea>
      </div>
    </>
  );
}