import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

// interface Props {
//   error: {
//     message?: string
//     errors?: {
//       [key: string]: string
//     }
//   }
// }

export default (props: any) => {
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
