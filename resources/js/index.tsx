import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Components
import Frame from "./components/Frame";
import User from "./components/pages/User";
import Home from "./components/pages/Home";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Frame />}>
        <Route index element={<Home />} />
        <Route path="/user" element={<User />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);