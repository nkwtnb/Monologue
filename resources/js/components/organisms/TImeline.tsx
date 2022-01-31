import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import CircleIcon from '../atoms/CircleIcon';
import userIcon from "@img/userIcon.png";
import axios from 'axios';
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

export default (): JSX.Element => {

  interface Entry {
    name: string,
    avatar: string,
    words: string;
    created_at: string;
  }

  const Post = styled.div`
    border: 1px solid #ddd;
    margin-top: 2px;
  `;
 
  const CardHeader = styled.div`
    font-size: 18px;
    font-weight: bold;
    height: 34px;
    white-space: nowrap;
  `;

  const Text = styled.div`
    font-size: 14px;
    white-space: pre-wrap;
    word-break: break-all;
  `;

  const IconColumn = styled.div`
    flex-basis: 70px;
  `;

  const Time = styled.span`
    font-size: 12px;
    font-weight: normal;
    color: #262323;
    &::before {
      content: " - ";
    }
  `;

  const [entries, setEntries] = useState<Entry[]>([]);
  
  useEffect(() => {
    (async () => {
      const resp = await axios.get("/words");
      const _entries = resp.data;
      console.log(_entries);
      setEntries([...entries, ..._entries])
    })();
  }, []);

  return (
    <>
      {
        entries.map((entry: Entry) => (
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <Post className='container-fluid'>
                <div className='row flex-nowrap'>
                  <IconColumn className='mt-2'>
                    <CircleIcon imgPath={entry.avatar} />
                  </IconColumn> 
                  <div className='col'>
                  <CardHeader>
                    <span>
                      {entry.name}
                    </span>
                    <Time className="created-at">
                      {entry.created_at}
                    </Time>
                  </CardHeader>
                  <Text>
                    {entry.words}
                  </Text>
                  </div>
               </div>
               <div className='row mt-2 mb-2'>
                 <div className='col d-flex justify-content-center'>
                  <i className="far fa-comment fa-lg"></i>
                 </div>
                 <div className='col d-flex justify-content-center'>
                  <i className="far fa-heart fa-lg"></i>
                </div>
               </div>
              </Post>
            </div>
          </div>
        ))
      }
    </>
  );
}