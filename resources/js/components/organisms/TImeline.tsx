import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import CircleIcon from '../atoms/CircleIcon';
import userIcon from "@img/userIcon.png";

export default (): JSX.Element => {

  const Post = styled.div`
    border: 1px solid #ddd;
    margin-top: 2px;
  `;

  const array = [
    {
      title: "title-a",
      text: `
      <script src="https://www.example.aa"></script>
      a
      a
      a`,
    },
    {
      title: "title-b",
      text: "b",
    },
    {
      title: "title-c",
      text: "c",
    },
  ];

  const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
  `;

  const Text = styled.div`
    font-size: 14px;
    white-space: pre;
  `;
  
  return (
    <>
      {
        array.map((post: any) => (
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <Post className='container-fluid'>
                <div className='row'>
                  <div className='col-md-1 mt-2'>
                    <CircleIcon imgPath={userIcon} />
                  </div>
                  <div className='col-md-11'>
                  <Title>
                    {post.title}
                  </Title>
                  <Text>
                    {post.text}
                  </Text>
                  </div>
               </div>
               <div className='row'>
                 <div>アイコン</div>
               </div>
              </Post>

            </div>
          </div>
          // <div>{post}</div>
        ))
      }
    </>
    // <div>
    //   <div className="d-flex bd-highlight mb-3">
    //     <div className="me-auto p-2 bd-highlight">
    //       <CircleIcon imgPath={img} />
    //     </div>
    //     <div className="p-2 bd-highlight">
    //       <CircleIcon imgPath={img} />
    //       <CircleIcon imgPath={userIcon} />
    //     </div>
    //   </div>
    // </div>
  );
}