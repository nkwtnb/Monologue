import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import CircleIcon from "../atoms/CircleIcon";
import CommentIcon from "../molecules/CommentIcon";
import Like from "../molecules/Like";
import noAvatar from "@img/no_avatar.png";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { Entry } from "@interface/Entry";
import PostedImageArea from "../molecules/PostedImageArea";
import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import LinkCard from "../molecules/LinkCard";
import { makePathForImage } from "@api/Resources";
import { AuthContext } from "../../Context";

interface Props {
  isDialog: boolean;
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

const Post = styled.div<{isDialog: boolean}>`
border: 1px solid #ddd;
background-color: #fff;
transition: background-color 0.2s;
${({isDialog}) => !isDialog && css`
  cursor: pointer;
  &:hover {
    background-color: #dddddd99;
    transition: background-color 0.2s;
  }
`}
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

const IconWrapper = styled.div`
border-radius: 40px;
&:hover {
  background-color: #01010126;
}
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
  const reactLocation = useLocation();
  const { authState } = useContext(AuthContext);
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

  const handleLike = async (e: any, id: number) => {
    e.stopPropagation();
    if (authState.name === "") {
      navigate("/login"); 
    } else {
      try {
        setLikeState(prev => {
          return {
            count: prev.isLike ? (prev.count-1) : (prev.count+1),
            isLike: !prev.isLike
          }
        });
        if (likeState.isLike) {
          await axios.delete("/api/likes", { data: { entryId: id } });
        } else {
          await axios.post("/api/likes", { entryId: id });
        }
      } catch (error: any) {
        const response = error.response;
        console.log(response);
        if (response.status === 419 || response.status === 401) {
          alert("セッションの有効期限切れの為、再ログインしてください。");
          navigate("/login");
          return;
        }
      }
    }
  }

  const handleComment = (e: any, id: number) => {
    e.stopPropagation();
    if (authState.name === "") {  
      navigate("/login"); 
    } else {
      navigate(
        reactLocation.pathname === "/" ?
                      `#/comment/${id}` :
                      `${reactLocation.pathname}/#/comment/${id}`
        , {replace: false, state: {click: true, ...props}}
      );
    }
  }

  const getOgp = async (words: string) => {
    const getUrl = (value: string) => {
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

  useEffect(() => {
    (async () => {
      const url = getOgp(props.words);
    })();
    setLikeState({
      count: props.likes,
      isLike: props.isLike
    })
  }, [props.likes, props.isLike]);	

  const handleCardClcik = (e: any) => {
    const oldPath = reactLocation.pathname;
    const newPath = `/post/${props.id}`;
    // ダイアログ表示では無く、新しい遷移先の場合、カードクリックで詳細ページへ移動
    if (!props.isDialog && oldPath !== newPath) {
      navigate(newPath);
    }
  }

  return (
    <Post id="card" className='justify-content-center entry-card' isDialog={props.isDialog} onClick={handleCardClcik}>
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
          <IconColumn className='col-2 mt-2'>
            {
              props.isDialog
              ?
              <CircleIcon image={makePathForImage(props.avatar, "upfiles") || noAvatar} />
              :
              <Link to={"/user/" + props.name} onClick={((e) => {e.stopPropagation()})}>
                <IconWrapper className="d-flex align-items-center justify-content-center">
                  <CircleIcon image={makePathForImage(props.avatar, "upfiles") || noAvatar} />
                </IconWrapper>
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
                  <React.Fragment key={index}>{element}</React.Fragment>
                ))
              }
            </Text>
            {
              (props.images.length > 0)
              ? <PostedImageArea images={props.images} />
              : <></>
            }
            {
              linkCard.title &&
              <LinkCard title={linkCard.title} description={linkCard.description} thumbnail={linkCard.thumbnail} url={linkCard.url}/>
            }
          </div>
        </div>
        {/* ダイアログの時はフッターは表示しない */}
        {!props.isDialog &&
          <>
            <div className='row mt-2 mb-2'>
              <div className='col d-flex justify-content-center'>
                <div onClick={((e) => handleComment(e, props.id))}>
                  <CommentIcon count={props.replyCount} {...props}></CommentIcon>
                </div>
              </div>
              <div className='col d-flex justify-content-center'>
                <Like count={likeState.count} icon={likeState.isLike ? solidHeart : regularHeart} onClick={(e) => handleLike(e, props.id)} className={likeState.isLike ? "liked" : ""}></Like>
              </div>
            </div>
          </>
        }
      </div>
    </Post>
  )
}