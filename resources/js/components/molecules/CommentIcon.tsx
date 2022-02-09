import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";

import "../../../css/app.css";
interface Props {
  // icon: any;
  count: number;
  // onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  // className: string;
}
const Count = styled.span`
margin-left: 8px;
`;

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
        <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
        <Count>{props.count}</Count>
       </Wrapper>
    </>
  );
}