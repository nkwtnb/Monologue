import React from "react";

interface Props {
  imageUrl?: string,
  label: string
}

export default (props: Props): JSX.Element => {
  return (
    <button>
      {props.label}
    </button>
  );
}