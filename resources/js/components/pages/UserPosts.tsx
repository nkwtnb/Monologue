import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import TImeline from '../organisms/TImeline';
import { useParams } from 'react-router-dom';

interface Props {
  filter: "post" | "like";
}

export default (props: Props) => {
  const { name } = useParams();

  return (
    <>
      <TImeline name={name} filter={props.filter}/>
    </>
  );
}
