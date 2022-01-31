import React from 'react';
import styled from 'styled-components';
import CircleIcon from '../atoms/CircleIcon';
import axios from 'axios';

interface PostMessgae  {
  words: string;
}

const postMessage = async (param: PostMessgae) => {
  const resp = await axios.post("/words", param);
  return resp;
}

const handleClick = () => {
  const element = document.getElementById("words") as HTMLInputElement;
  if (element.value === "") {
    return;
  }
  (async () => {
    const resp = await postMessage({
      words: element.value
    });
    window.location.reload();
  })();
}

export default () => {
  const Button = styled.button`
    width: 100px;
  `;

  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='row'>
            <div className="form-group">
              <label >ひとりごとをつぶやく…</label>
              <textarea className="form-control" id="words" rows={3}></textarea>
            </div>
          </div>
          <div className='row'>
            <div className='d-flex justify-content-end'>
              <div className='mr-auto mt-1 mb-2'>
                <Button className="btn btn-primary" onClick={handleClick}>つぶやく</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}