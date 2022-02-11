import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CircleIcon from "../atoms/CircleIcon";
import CommentIcon from "../molecules/CommentIcon";
import Like from "../molecules/Like";
import noAvatar from "@img/no_avatar.png";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { Entry } from "@interface/Entry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DetailIcon from "../molecules/DetailIcon";

interface Props {
  handleLike: any;
  handleComment?: any;
  onDialog: boolean;
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

export default (props: Entry & Props) => {
  const navigate = useNavigate();
  
  const handleComment = (id: number) => {
    console.log("handlecomment " + id);
    const element = document.getElementById("toggle-modal-" + id);
    element?.click();
  }

  const handleClick = (e: any) => {
    // console.log(e.currentTarget);
    // console.log(e.currentTarget.classList.contains("entry-card"));
    navigate(`/post/${props.id}`)
  }

  return (
    <Post className='justify-content-center entry-card'>
      <div className='container-fluid'>
        {/* <div className='row flex-nowrap'> */}
        <div className='row flex-nowrap'>
          <IconColumn className='mt-2'>
            {
              props.onDialog
              ?
              <CircleIcon imgPath={props.avatar || noAvatar} />
              :
              <Link to={"/user/" + props.name}>
                <CircleIcon imgPath={props.avatar || noAvatar} />
              </Link>
            }
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
        {/* ダイアログの時はフッターは表示しない */}
        {!props.onDialog &&
          <div className='row mt-2 mb-2'>
            <div className='col d-flex justify-content-center'>
              <div onClick={(() => handleComment(props.id))}>
                <CommentIcon count={props.replyCount} {...props}></CommentIcon>
              </div>
            </div>
            <div className='col d-flex justify-content-center'>
              <Like count={props.likes} icon={props.like ? solidHeart : regularHeart} onClick={(e) => props.handleLike(e, props.id)} className={props.like ? "liked" : ""}></Like>
            </div>
            <div className='col d-flex justify-content-center'>
              {/* <FontAwesomeIcon icon={faEllipsisH} /> */}
              {/* <Like count={props.likes} icon={props.like ? solidHeart : regularHeart} onClick={(e) => props.handleLike(e, props.id)} className={props.like ? "liked" : ""}></Like> */}
              <div onClick={handleClick}>
                <DetailIcon />
              </div>
            </div>
          </div>
        }
      </div>
    </Post>
  )
}