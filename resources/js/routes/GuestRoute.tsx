import React, { ReactNode } from "react";
import RestrictedRoute from "./RestrictedRoute";

interface Props {
  children: ReactNode;
}

export default (props: Props) => {
  return (
    <RestrictedRoute type="guest">
      {props.children}
    </RestrictedRoute>
  );
}