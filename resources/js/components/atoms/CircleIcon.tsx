import styled from "styled-components";
import React from "react";

interface Props {
  width?: number;
  height?: number;
  image: string;
}

const DEFAULT_SIZE: number = 40;

const Wrapper = styled.span`
padding: 2px;
display: inline-block;
`;

const Image = styled.img`
width: ${props => props.width ? props.width : DEFAULT_SIZE}px;
height: ${props => props.height ? props.height : DEFAULT_SIZE}px;
background-color: #ddd;
border-radius: ${DEFAULT_SIZE}px;
`;

export default (props: Props): JSX.Element => {
  return (
    <Wrapper data-testid="circle-icon" className="circle-icon">
      <Image className="d-flex justify-content-center align-items-center" src={props.image} />
    </Wrapper>
  );
}