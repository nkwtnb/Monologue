import axios from "axios";
import { useEffect, useState } from "react";
import * as entryUtil from "@api/Entries";
import * as userApi from "../../../api/User";
import { Entry } from "@interface/Entry";

export type Props = {
  name: string | undefined
  filter: "post" | "like" | "media"
  authState: userApi.Type
}

export default (props: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Entry[]>([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setData([]);
    (async () => {
      try {
        const _entries = await entryUtil.getEntries({name: props.name, filter: props.filter});
        const entries = await entryUtil.setLikeStatus(_entries, props.authState.name);
        setData(entries);
        setLoading(false);
      } catch (e: any) {
        setError(e.response);
      }
    })();
  }, [props.name, props.filter]);

  return {
    isLoading,
    data,
    error
  };
}
