import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import Frame from "./components/Frame";
import User from "./components/pages/UserInfo";
import Home from "./components/pages/Home";
import Welcome from "./components/pages/Welcome";
import * as userApi from "./api/User";
import Context from "./Context";

(async () => {
  const authenticatedUser = await userApi.getAuthencatedUser();

  ReactDOM.render(
    <Context user={authenticatedUser}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Welcome isRegister={true} />} />
            <Route path="/login" element={<Welcome isRegister={false} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context>,
    document.getElementById("root")
  );
})();
