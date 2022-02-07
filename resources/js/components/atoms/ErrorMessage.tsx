import React from 'react';

interface Props {
  type: string;
  error: any;
}

export default (props: Props) => {
  let messages = [];
  for (let key in props.error.errors) {
    const message = props.error.errors[key];
    messages.push(message);
  }
  return (
    <>
      <div id="alert" className="alert alert-danger" role="alert" style={{ display: 'none' }}>
        <ul id="errors">
          {
            messages.map((message, i) => (
              <li key={i}>{message}</li>
            ))
          }
        </ul>
      </div>
    </>
  );
}
