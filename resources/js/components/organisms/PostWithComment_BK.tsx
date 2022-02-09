import styled from 'styled-components';
import CircleIcon from '../atoms/CircleIcon';
import Like from '../molecules/Like';
import CommentIcon from '../molecules/CommentIcon';
import noAvatar from "@img/no_avatar.png";
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { Link } from 'react-router-dom';
import CommentDialog from './CommentDialog';

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
  console.log("render Post");
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  useLayoutEffect(() => {
    setLike(props.like);
    setLikes(props.likes);
  }, [props.like, props.likes]);
  const handleLike = (e: any, id: number) => {
    (async () => {
      if (like) {
        const resp = await axios.delete("/api/likes", {
          data: {
            entryId: id
          }
        });
        setLikes(prev => prev - 1);
      } else {
        const resp = await axios.post("/api/likes", { entryId: id });
        setLikes(prev => prev + 1);
      }
    })();
    setLike(prev => !prev);
  }
  const handleClick = () => {
    const element = document.getElementById("toggle-modal-" + props.id);
    element?.click();
    console.log("click : " + props.id);
  }

  return (
    <>
      <Post className='justify-content-center'>
        <div className='container-fluid'>
          <div className='row flex-nowrap'>
            <IconColumn className='mt-2'>
              <Link to={"/user/" + props.name}>
                <CircleIcon imgPath={props.avatar || noAvatar} />
              </Link>
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
              <div onClick={handleClick}>
                <CommentIcon count={0} {...props}></CommentIcon>
              </div>
            </div>
            <div className='col d-flex justify-content-center'>
              <Like count={likes} icon={like ? solidHeart : regularHeart} onClick={(e) => handleLike(e, props.id)} className={like ? "liked" : ""}></Like>
            </div>
          </div>
        </div>
      </Post>
    </>
  );
}