import React from 'react';
import styled from 'styled-components';
import CircleIcon from '../atoms/CircleIcon';
// sample
import img from "@img/circle.png";
import userIcon from "@img/userIcon.png";

export default () => {
  const Header = styled.nav`
    height: 60px;
  `;

  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='row'>
            <div className="form-group">
              <label >ひとりごとをつぶやく…</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
            </div>
          </div>
          <div className='row'>
            <div className='d-flex justify-content-end'>
              <div className='col-md-1 me-2 mt-1 mb-2'>
                <button className="btn btn-primary">つぶやく</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}