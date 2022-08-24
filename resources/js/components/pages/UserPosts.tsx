import React from 'react';
import Timeline from '../organisms/Timeline';
import { useParams } from 'react-router-dom';

interface Props {
  filter: "post" | "like" | "media";
}

export default (props: Props) => {
  const { name } = useParams();

  return (
    <Timeline name={name} filter={props.filter}/>
  );
}
