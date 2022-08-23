import styled from "styled-components";
import React from "react";
import CircleIcon from "../atoms/CircleIcon";
import NoAvatar from "../../../img/no_avatar.png";

interface Props {
  image: string
  oncClick: () => void
}

const AvatarArea = styled.div`
position: relative;
`;

const AvatarDeleteButton = styled.button`
position: absolute;
right: 0;
top: 0;
background-color: #a5a3a387;
border: none;
width: 20px;
height: 20px;
line-height: 20px;
border-radius: 10px;
`;

export default (props: Props): JSX.Element => {
  return (
    <AvatarArea>
      {/* アバターが設定されている場合、クリアボタンの描画 */}
      {
        props.image
        ?
          <AvatarDeleteButton onClick={props.oncClick}>×</AvatarDeleteButton>
        :
          <></>
      }
      <CircleIcon image={props.image || NoAvatar} />
    </AvatarArea>
  );
}