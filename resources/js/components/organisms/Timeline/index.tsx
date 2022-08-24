import React, { useContext } from 'react';
import { AuthContext } from '../../../Context';
import useRequest from '../../../hooks/useRequest';
import Presenter from './Presenter';

interface Props {
  name: string | undefined;
  filter: "post" | "like" | "media";
}

export default (props: Props): JSX.Element => {
  const {authState, setAuthState} = useContext(AuthContext);
  const {data, error, isLoading} = useRequest({name: props.name, filter: props.filter, authState: authState});

  return <Presenter data={data} error={error} isLoading={isLoading} />
}
