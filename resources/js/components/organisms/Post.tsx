import styled from 'styled-components';
import CircleIcon from '../atoms/CircleIcon';
import Like from '../molecules/Like';
import noAvatar from "@img/no_avatar.png";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons/faHeart";

interface Entry {
  name: string,
  id: number,
  avatar: string,
  words: string;
  created_at: string;
  likes: number;
  like: boolean;
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

export default (props: Entry) => {
  console.log("Post likes : " + props.likes);
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    setLike(props.like);
    setLikes(props.likes);
  }, [props.like, props.likes]);
  const handleLike = (e: any, id: number) => {
    (async () => {
      if (like) {
        const resp = await axios.delete("/likes", {
          data: {
            entryId: id
          }
        });
        setLikes(prev => prev - 1);
      } else {
        const resp = await axios.post("/likes", {entryId: id});
        setLikes(prev => prev + 1);
      }
    })();
    setLike(prev => !prev);
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <Post className='container-fluid'>
          <div className='row flex-nowrap'>
            <IconColumn className='mt-2'>
              <CircleIcon imgPath={props.avatar || noAvatar} />
            </IconColumn>
            <div className='col'>
              <CardHeader>
                <span>
                  {props.name}
                </span>
                <Time className="created-at">
                  {props.created_at}
                </Time>
              </CardHeader>
              <Text>
                {props.words}
              </Text>
            </div>
          </div>
          <div className='row mt-2 mb-2'>
            <div className='col d-flex justify-content-center'>
            </div>
            <div className='col d-flex justify-content-center'>
              <Like count={likes} icon={like ? solidHeart : regularHeart} onClick={(e) => handleLike(e, props.id)} className={like ? "liked" : ""}></Like>
            </div>
          </div>
        </Post>
      </div>
    </div>
  );
}