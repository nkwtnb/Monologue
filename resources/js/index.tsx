import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Frame from "./components/Frame";
import User from "./components/User";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Frame />}>
        {/* <Route index element= */}
        <Route path="/user" element={<User />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);