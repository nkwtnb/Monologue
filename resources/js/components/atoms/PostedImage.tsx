import React from "react";
import { makePathForImage } from "@api/Resources";
import styled, { css } from "styled-components";
const SIZE = {
  WIDTH: 300,
  HEIGHT: 200,
};

interface ImageProps {
  image: string;
  heightTimes: number;
  widthTimes: number;
  radius?: {
    [key: string]: string,
  } | undefined
}

const Image = styled.div<ImageProps>`
height: ${({heightTimes}) => SIZE.HEIGHT * heightTimes}px;
/* width: ${({widthTimes}) => SIZE.WIDTH * widthTimes}px; */
width: 100%;
border: 1px solid #ddd;
background-image: url(${({image}) => image});
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
&:hover { 
  cursor: pointer;
  border: 2px solid #ddd;
  box-shadow: 2px 2px 2px #ddd;
  transition: box-shadow 0.2s;
}

${({radius}) => radius!["border-top-right-radius"] && css`
border-top-right-radius: ${radius!["border-top-right-radius"]};
`}

${({radius}) => radius!["border-top-left-radius"] && css`
border-top-left-radius: ${radius!["border-top-left-radius"]};
`}

${({radius}) => radius!["border-bottom-right-radius"] && css`
border-bottom-right-radius: ${radius!["border-bottom-right-radius"]};
`}

${({radius}) => radius!["border-bottom-left-radius"] && css`
border-bottom-left-radius: ${radius!["border-bottom-left-radius"]};
`}
`;

export default (props: any) => {

  const handleClick = (e: any, imageUrl: string | undefined) => {
    e.stopPropagation();
    const url = imageUrl;
    window.open(url, '_blank')
  }
  const imagePath = makePathForImage(props.image, "upfiles");

  return (
    <Image radius={props.radius} image={imagePath} widthTimes={props.widthTimes} heightTimes={props.heightTimes} onClick={((e) => handleClick(e, imagePath))}
    />
  )
}