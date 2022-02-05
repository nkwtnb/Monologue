import React from 'react';
import styled from 'styled-components';
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
  
interface Props {
  fa: [
    style: string,
    code: string,
    size: string,
  ],
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Wrapper = styled.span`
&:hover {
  cursor: pointer;
}
`;
export default (props: Props) => {
  return (
    <Wrapper onClick={props.onClick}>
      <i className={props.fa.join(" ")}></i>
    </Wrapper>
  );
}
