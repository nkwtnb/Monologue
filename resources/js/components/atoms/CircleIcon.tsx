import styled from "styled-components";
import React from "react";

interface Todo {
  width?: number;
  height?: number;
  imgPath: string;
}

const SIZE: number = 40;

export default (props: Todo): JSX.Element => {
  const Wrapper = styled.div`
    padding: 4px;
    display: inline-block;
  `;
  const Image = styled.img`
    width: ${props.width ? props.width : SIZE}px;
    height: ${props.height ? props.height : SIZE}px;
    background-color: #ddd;
    border-radius: ${SIZE}px;
  `;
  return (
    <Wrapper>
     <Image className="d-flex justify-content-center align-items-center" src={props.imgPath} />
    </Wrapper>
  );
}