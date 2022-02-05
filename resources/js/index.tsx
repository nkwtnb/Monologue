import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

// Components
import Frame from "./components/Frame";
import User from "./components/pages/User";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";

import Context from "./Context";

interface UserInfo {
  name: string,
  email: string,
  avatar?: string | ArrayBuffer | null,
  imgFile?: Blob | string | null,
  children?: any
}

// TODO 初期値はサーバーから返すようにする
const INITIAL_STATE: UserInfo = {
  name: "",
  email: "",
  avatar: "",
  imgFile: ""
}

const getUserInfo = async (): Promise<UserInfo | undefined> => {
  // const resp = await axios.get('/sanctum/csrf-cookie');
  try {
    const userInfo = await axios.get("api/user");
    if (userInfo.data) {
      return userInfo.data;
    } else {
      return INITIAL_STATE;
    }
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  const user = await getUserInfo();

  ReactDOM.render(
    <Context user={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route index element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Register isRegister={true} />} />
            <Route path="/login" element={<Register isRegister={false} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context>,
    document.getElementById("root")
  );
})();
