import React, { useState } from 'react';
import styled from 'styled-components';
import CircleIcon from '../atoms/CircleIcon';
import axios from 'axios';

interface PostMessgae  {
  words: string;
  reply_to: number | undefined;
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

export default (props: Props) => {
  // console.log("replyTO : " + props.replyTo);
  const [contents, setContents] = useState("");
  const handleChange = (e: any) => {
    setContents(e.target.value);
  }

  const handleClick = () => {
    (async () => {
      const resp = await postMessage({
        "words": contents,
        "reply_to": props.replyTo 
      });
      window.location.reload();
    })();
  }
  
  return (
    <>
      <div className='row justify-content-center'>
        <div className="form-group">
          <label >ひとりごとをつぶやく…</label>
          <textarea className="form-control" id="words" rows={3} value={contents} onChange={handleChange} ></textarea>
        </div>
      </div>
      <div className='row'>
        <div className='d-flex justify-content-end'>
          <div className='mr-auto mt-1 mb-2'>
            <Button className="btn btn-primary" onClick={handleClick}>つぶやく</Button>
          </div>
        </div>
      </div>
    </>
  );
}