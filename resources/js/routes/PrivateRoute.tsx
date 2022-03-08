import React, { ReactNode } from "react";
import RestrictedRoute from "./RestrictedRoute";

interface Props {
  children: ReactNode;
}

export default (props: Props) => {
  return (
    <RestrictedRoute type="private">
      {props.children}
    </RestrictedRoute>
  );
}