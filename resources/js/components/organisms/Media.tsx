import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

interface Media {
  url: string;
}

interface Props {
  mediaList: Media[];
}

export default (props: any) => {
  const [mediaList, setMediaList] = useState<Media[]>([]);

  return (
    <>
    </>
  )
}