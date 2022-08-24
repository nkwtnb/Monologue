import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  type: "danger" | "success" | "warning"
  messages?: string[]
  children?: ReactNode
}

const Messages = styled.ul`
  margin-bottom: 0px;
`;

const Message = styled.li`
  white-space: break-spaces;
`;

const MessageArea = styled.div`
  margin-bottom: 0px;
`

export default (props: Props) => {
  return (
    <>
      <MessageArea data-testid={props.type} id={props.type} className={`w-100 alert alert-${props.type}`} role="alert">
        {
          // メッセージの配列 / 子要素のカスタムメッセージ
          props.messages?.length
          ?
          <Messages>
            {
              props.messages.map((message, i) => (
                <Message key={i}>{message}</Message>
              ))
            }
          </Messages>
          :
          props.children
        }
      </MessageArea>
    </>
  );
}
