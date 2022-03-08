import { Navigate, useLocation } from "react-router-dom";
import * as userApi from "@api/User";
import { AuthContext } from "../Context";
import React, { PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

interface Props {
  type: "private"|  // 認証済みのみ
        "guest"     // 未認証のみ
}

export default (props: PropsWithChildren<Props>) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const path = useLocation().pathname;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
 
  useEffect(() => {
    setIsAuthenticated(null);
    (async () => {
      const user = await userApi.getAuthenticatedUser();
      if (user.name) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setAuthState(user);
    })();
  }, [path]);

  return useMemo(() => {
    // 認証情報取得後
    if (isAuthenticated !== null) {
      // 認証済みのみ or 未認証のみ に応じたルートを返却
      if (props.type === "private") {
        return isAuthenticated ? <>{props.children}</> : <Navigate to={"/"}/>;
      } else {
        return isAuthenticated ? <Navigate to={"/"}/> : <>{props.children}</>;
      }
    } else {
      return <></>;
    }
  }, [isAuthenticated]);
}