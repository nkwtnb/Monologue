import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";

const Wrapper = styled.div`
color: #010101;
padding: 2px 10px;
&:hover {
  cursor: pointer;
  background-color: #2a19251f;
  border-radius: 20px;
}
`;

export default (props: any) => {
  return (
    <>
      <Wrapper>
        <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
      </Wrapper>
    </>
  );
}