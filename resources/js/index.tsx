import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../css/app.css";
// Components
import Frame from "./components/templates/Frame";
import User from "./components/pages/UserInfo";
import Home from "./components/pages/Home";
import Welcome from "./components/pages/Welcome";
import * as userApi from "./api/User";
import Context from "./Context";
import ProfileFrame from "./components/templates/ProfileFrame";
import UserPosts from "./components/pages/UserPosts";
import PostInfo from "./components/pages/PostInfo";
import MediaList from "./components/pages/MediaList";
import Email from "./components/pages/Email";
import Reset from "./components/pages/Reset";
import RestrictedRoute from "./routes/RestrictedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import GuestRoute from "./routes/GuestRoute";

(async () => {
  const authenticatedUser = await userApi.getAuthenticatedUser();

  ReactDOM.render(
    <Context user={authenticatedUser}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<Home />} />
            <Route path="post/:postId" element={<PostInfo />}/>
            <Route path="user/:name" element={<ProfileFrame />}>
              <Route index element={<UserPosts filter="post"/>}/>
              <Route path="like" element={<UserPosts filter="like"/>}/>
              <Route path="media" element={<MediaList filter="media"/>}/>
            </Route>
            <Route path="/settings" element={<PrivateRoute><User /></PrivateRoute>} />
            <Route path="/register" element={<GuestRoute><Welcome isRegister={true} /></GuestRoute>} />
            <Route path="/login" element={<GuestRoute><Welcome isRegister={false} /></GuestRoute>} />
            <Route path="/password/email" element={<GuestRoute><Email /></GuestRoute>} />
            <Route path="/password/reset/*" element={<GuestRoute><Reset /></GuestRoute>} />
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
