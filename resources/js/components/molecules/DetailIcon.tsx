import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string 
}

const Wrapper = styled.div`
color: #010101;
padding: 2px 10px;
&:hover {
  cursor: pointer;
  background-color: #2a19251f;
  border-radius: 20px;
}
`;

export default (props: Props) => {
  return (
    <>
      <Wrapper onClick={props.onClick} className={props.className}>
        <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
      </Wrapper>
    </>
  );
}