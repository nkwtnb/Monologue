import React from 'react';

interface Props {
  messages: string[]
}

export default (props: Props) => {
  return (
    <>
      <div id="alert" className="w-100 alert alert-danger" role="alert" style={props.messages.length === 0 ? {display: "none"} : {display: "block"}}>
        <ul id="errors">
          {
            props.messages.map((message, i) => (
              <li key={i}>{message}</li>
            ))
          }
        </ul>
      </div>
    </>
  );
}
