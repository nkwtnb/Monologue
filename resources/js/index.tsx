import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, matchPath, Route, Routes } from "react-router-dom";

// Components
import Frame from "./components/templates/Frame";
import User from "./components/pages/UserInfo";
import Home from "./components/pages/Home";
import Welcome from "./components/pages/Welcome";
import * as userApi from "./api/User";
import Context from "./Context";
import ProfileFrame from "./components/templates/ProfileFrame";
import UserPosts from "./components/pages/UserPosts";

(async () => {
  const authenticatedUser = await userApi.getAuthencatedUser();

  ReactDOM.render(
    <Context user={authenticatedUser}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<Home />} />
            <Route path="user/:name" element={<ProfileFrame />}>
              <Route index element={<UserPosts filter="post"/>}/>
              <Route path="like" element={<UserPosts filter="like"/>}/>
            </Route>
            <Route path="/settings" element={<User />} />
            <Route path="/register" element={<Welcome isRegister={true} />} />
            <Route path="/login" element={<Welcome isRegister={false} />} />
            <Route path="*" element={(
              <p>Not Found</p>
            )} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context>,
    document.getElementById("root")
  );
})();
