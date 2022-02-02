import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import CircleIcon from '../atoms/CircleIcon';
import Like from '../molecules/Like';
import noAvatar from "@img/no_avatar.png";
import axios from 'axios';

export default (): JSX.Element => {

  interface Entry {
    name: string,
    id: number,
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

  const handleLike = async (e: any, id: number) => {
    if (likes.indexOf(id) === -1) {
      setLikes([...likes, id]);
      const resp = await axios.post("/likes", {entryId: id});
    } else {
      const _likes = likes.filter(likedEntryId => likedEntryId !== id);
      setLikes([..._likes]);
      const resp = await axios.delete("/likes", {
        data: {
          entryId: id
        }
      });
    }
  }

  const [entries, setEntries] = useState<Entry[]>([]);
  const [likes, setLikes] = useState<number[]>([])
  
  useEffect(() => {
    (async () => {
      //エントリー取得
      const resp = await axios.get("/words");
      const _entries = resp.data;
      setEntries([...entries, ..._entries]);
      //いいね取得
      const respLikes = await axios.get("/likes");
      const _likes = respLikes.data;
      setLikes([...likes, ..._likes]);  
      console.log(likes);
    })();
  }, []);

  return (
    <>
      {
        entries.map((entry: Entry, index) => (
          <div className='row justify-content-center' key={index}>
            <div className='col-md-8'>
              <Post className='container-fluid'>
                <div className='row flex-nowrap'>
                  <IconColumn className='mt-2'>
                    <CircleIcon imgPath={entry.avatar || noAvatar} />
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
                 </div>
                 <div className='col d-flex justify-content-center'>
                 <Like id={entry.id} likes={likes} onClick={(e) => handleLike(e, entry.id)}></Like>
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