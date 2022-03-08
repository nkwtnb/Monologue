import React from 'react';
import styled from 'styled-components';

interface Props {
  messages: string[]
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
      <MessageArea id="alert" className="w-100 alert alert-danger" role="alert" style={props.messages.length === 0 ? {display: "none"} : {display: "block"}}>
        <Messages id="errors">
          {
            props.messages.map((message, i) => (
              <Message key={i}>{message}</Message>
            ))
          }
        </Messages>
      </MessageArea>
    </>
  );
}
