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
import PostedImage from "../molecules/PostedImage";

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
    const element = document.getElementById("toggle-modal-" + id);
    element?.click();
  }

  const handleClick = (e: any) => {
    navigate(`/post/${props.id}`)
  }

  const generateEmbedUrl = (words: string): string | null => {
    const getMovieId = (value: string) => {
      const reg = new RegExp(/\?v=.*\b/,"gi");
      const results = reg.exec(value);
      if (!results) {
        return null;
      }
      const movieId = results[0].substring(3);
      return movieId;
    }
    const isContainYoutubeUrl = (value: string) => {
      const reg = new RegExp(/\bhttps:\/\/www\.youtube\.com\/watch\?v=.*\b/,"gi");
      const results = reg.exec(value);
      return results ? results : false;
    }
    if (!isContainYoutubeUrl(words)) {
      return null;
    }
    const movieId: any = getMovieId(words);
    return movieId;
  }

  const movieId = generateEmbedUrl(props.words);

  return (
    <Post className='justify-content-center entry-card'>
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
          <IconColumn className='col-2 mt-2'>
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
          <div className='col-10 flex-grow-1'>
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
            {
              (props.images.length > 0) &&
              <PostedImage images={props.images} />
            }
            {
              movieId && 
              <div className="d-flex justify-content-center mt-2 mb-2">
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + movieId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
              </div>
            }
          </div>
        </div>
        {/* ダイアログの時はフッターは表示しない */}
        {!props.onDialog &&
          <>
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
                <div onClick={handleClick}>
                  <DetailIcon />
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </Post>
  )
}