import React from 'react';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isSubmit: boolean;
  label: string
}

export default (props: Props) => {
  return (
    <button data-testid="card-button" onClick={props.onClick} className={"btn w-100 " + (props.isSubmit ? "btn-primary" : "btn-outline-primary")} >
      {props.label}
    </button>
  );
}

