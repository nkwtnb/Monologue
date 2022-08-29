import React from "react";
import { cleanup, fireEvent, render, screen,  } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Context from "../../Context";
import HeaderIcon from "./HeaderIcon";

afterEach(() => cleanup());
describe("CircleIcon unit test", () => {
  it("Context未設定（＝未ログイン）時、未ログイン用のメニューが表示される", () => {
    const util = render(
      <Context user={{name: "", email: ""}}>
        <BrowserRouter>
          <HeaderIcon image=""></HeaderIcon>
        </BrowserRouter>
      </Context>
    );
    expect(util.getByTestId("dropdown-menu").children.length).toBe(2);
    expect(util.getByTestId("register")).toBeInTheDocument();
    expect(util.getByTestId("login")).toBeInTheDocument();
  });
  it("Context設定（＝ログイン済）時、ユーザー用のメニューが表示される", () => {
    const util = render(
      <Context user={{name: "username", email: "user@example.com"}}>
        <BrowserRouter>
          <HeaderIcon image="" name="username"></HeaderIcon>
        </BrowserRouter>
      </Context>
    );
    expect(util.getByTestId("dropdown-menu").children.length).toBe(3);
    expect(util.getByTestId("user-info")).toBeInTheDocument();
    expect(util.getByTestId("config")).toBeInTheDocument();
    expect(util.getByTestId("logout")).toBeInTheDocument();
    expect(util.getByTestId("username").textContent).toEqual("username")
  });
})