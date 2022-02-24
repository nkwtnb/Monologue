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
import PostedImageArea from "../molecules/PostedImageArea";
import axios from "axios";
import { useEffect, useState } from "react";
import LinkCard from "../molecules/LinkCard";
import { render } from "react-dom";
import { makePathForImage } from "@api/Resources";

interface Props {
  onDialog: boolean;
}

interface LikeState {
  count: number;
  isLike: boolean
}

interface LinkCardState {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const Post = styled.div`
border: 1px solid #ddd;
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
  const [linkCard, setLinkCard] = useState<LinkCardState>({
    title: "",
    description: "",
    thumbnail: "",
    url: ""
  });
  const [likeState, setLikeState] = useState<LikeState>({
    count: 0,
    isLike: false 
  });
  const navigate = useNavigate();

  const handleLike = (e: any, id: number) => {
    (async () => {
      setLikeState(prev => {
        return {
          count: prev.isLike ? (prev.count-1) : (prev.count+1),
          isLike: !prev.isLike
        }
      });
      if (likeState.isLike) {
        const resp = await axios.delete("/api/likes", { data: { entryId: id } });
      } else {
        const resp = await axios.post("/api/likes", { entryId: id });
      }
    })();
  }
  
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

  const getOgp = async (words: string) => {
    const getUrl = (value: string) => {
      // const reg = new RegExp(/\bhttps:\/\/.*\b/,"gi");
      const reg = new RegExp(/(https:\/\/\S+)/ig);
      
      const results = reg.exec(value);
      if (!results) {
        return [];
      }
      return results;
    }
    const matchUrl = getUrl(words);
    const url = matchUrl[0];
    if (url) {
      setLinkCard({
        title: props.ogp_title,
        description: props.ogp_description,
        thumbnail: makePathForImage(props.ogp_image, "ogp"),
        url: url,
      });
    } else {
      setLinkCard({
        title: "",
        description: "",
        thumbnail: "",
        url: "",
      });
    }
    return;
  }

  const renderWords = (value: string) => {
    const strings: any[] = props.words.split(/(https:\/\/\S+)/ig);
    // URL文字列で区切り、[URL前の文字][URL][URL後の文字]に分割される為、
    // index=1からスタートし、2ずつ加算
    for (let i=1; i<strings.length; i+=2) {
      strings[i] = <a href={strings[i]} target="_blank">{strings[i]}</a>;
    }
    return strings;
  }
  // const movieId = generateEmbedUrl(props.words);

  useEffect(() => {
    (async () => {
      const url = getOgp(props.words);
    })();
    setLikeState({
      count: props.likes,
      isLike: props.isLike
    })
  }, [props.likes, props.isLike]);

  return (
    <Post className='justify-content-center entry-card'>
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
          <IconColumn className='col-2 mt-2'>
            {
              props.onDialog
              ?
              <CircleIcon image={makePathForImage(props.avatar, "upfiles") || noAvatar} />
              :
              <Link to={"/user/" + props.name}>
                <CircleIcon image={makePathForImage(props.avatar, "upfiles") || noAvatar} />
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
              {
                renderWords(props.words).map((element, index) => (
                  <div key={index}>{element}</div>
                ))
              }
            </Text>
            {
              (props.images.length > 0)
              ? <PostedImageArea images={props.images} />
              : <></>
            }
            {/* {
              movieId && 
              <div className="d-flex justify-content-center mt-2 mb-2">
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + movieId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
              </div>
            } */}
            {
              linkCard.title 
              ? <LinkCard title={linkCard.title} description={linkCard.description} thumbnail={linkCard.thumbnail} url={linkCard.url}/>
              : <></>
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
                <Like count={likeState.count} icon={likeState.isLike ? solidHeart : regularHeart} onClick={(e) => handleLike(e, props.id)} className={likeState.isLike ? "liked" : ""}></Like>
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