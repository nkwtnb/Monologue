import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Welcome from "./Welcome";
import { BrowserRouter } from "react-router-dom";

afterEach(() => cleanup());
describe("page > Welcome", () => {
  it("新規登録用画面が表示されること", async () => {
    const utils = await render(
      <BrowserRouter>
        <Welcome isRegister={true}/>
      </BrowserRouter>
    );
    expect(utils.getByTestId("email")).toBeInTheDocument();
    expect(utils.getByTestId("password_confirm")).toBeInTheDocument();
    expect(utils.queryByTestId("remember")).not.toBeInTheDocument();
  });
  it("ログイン用画面が表示されること", async () => {
    const utils = await render(
      <BrowserRouter>
        <Welcome isRegister={false}/>
      </BrowserRouter>
    );
    expect(utils.queryByTestId("email")).not.toBeInTheDocument();
    expect(utils.queryByTestId("password_confirm")).not.toBeInTheDocument();
    expect(utils.getByTestId("remember")).toBeInTheDocument();
  });
});
