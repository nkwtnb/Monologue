import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import CircleIcon from '../atoms/CircleIcon';
import userIcon from "@img/userIcon.png";
import axios from 'axios';

export default (): JSX.Element => {

  interface Entry {
    name: string,
    avatar: string,
    words: string;
  }

  const Post = styled.div`
    border: 1px solid #ddd;
    margin-top: 2px;
  `;
 
  const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
  `;

  const Text = styled.div`
    font-size: 14px;
    white-space: pre-wrap;
    word-break: break-all;
  `;

  const [entries, setEntries] = useState<Entry[]>([]);
  
  useEffect(() => {
    (async () => {
      const resp = await axios.get("/words");
      const _entries = resp.data;
      setEntries([...entries, ..._entries])
    })();
  }, []);

  return (
    <>
      {
        entries.map((entry: Entry) => (
        // array.map((post: any) => (
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <Post className='container-fluid'>
                <div className='row flex-nowrap'>
                  <div className='mt-2 flex-shrink-1'>
                    <CircleIcon imgPath={entry.avatar} />
                  </div>
                  <div className='flex-grow-1'>
                  <Title>
                    {entry.name}
                  </Title>
                  <Text>
                    {entry.words}
                  </Text>
                  </div>
               </div>
               <div className='row'>
                 <div>アイコン</div>
               </div>
              </Post>
            </div>
          </div>
        ))
      }
    </>
  );
}