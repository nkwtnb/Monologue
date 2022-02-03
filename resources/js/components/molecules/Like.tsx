import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import "../../../css/app.css";
interface Props {
  icon: any;
  count: number;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className: string;
}

export default (props: Props) => {
  const Count = styled.span`
    margin-left: 8px;
  `;

  const Wrapper = styled.div`
    color: #e700a0;
    padding: 2px 10px;
    &:hover {
      cursor: pointer;
      background-color: #e700a01f;
      border-radius: 20px;
    }
  `;
  return (
    <>
      <Wrapper onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} className={props.className}></FontAwesomeIcon>
        <Count>{props.count}</Count>
      </Wrapper>
    </>
  );
}