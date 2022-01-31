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
 
  const CardHeader = styled.div`
    font-size: 18px;
    font-weight: bold;
    height: 34px
  `;

  const Text = styled.div`
    font-size: 14px;
    white-space: pre-wrap;
    word-break: break-all;
  `;

  const IconColumn = styled.div`
    flex-basis: 70px;
  `
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
                  <IconColumn className='mt-2'>
                    <CircleIcon imgPath={entry.avatar} />
                  </IconColumn>
                  <div className='col'>
                  <CardHeader>
                    {entry.name}
                  </CardHeader>
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