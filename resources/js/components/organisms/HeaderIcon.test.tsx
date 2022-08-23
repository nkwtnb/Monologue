import React from "react";
import CircleIcon from "../atoms/CircleIcon";
import { cleanup, fireEvent, render, screen,  } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Context from "../../Context";

afterEach(() => cleanup());
describe("CircleIcon unit test", () => {
  it("ヘッダーの場合、classに 'circle-icon-header' が設定される", () => {
    render(
      <Context user={{name: "test", email: "test@example.com"}}>
        <BrowserRouter>
          <CircleIcon image=""></CircleIcon>
        </BrowserRouter>
      </Context>
    );
    const circle = screen.getByTestId("circle-icon");
    expect(circle.className.indexOf("circle-icon-header")).toBeGreaterThanOrEqual(0);
  });

  it("ヘッダー以外の場合、classに 'circle-icon' が設定される", () => {
    render(
      <Context user={{name: "test", email: "test@example.com"}}>
        <BrowserRouter>
          <CircleIcon image=""></CircleIcon>
        </BrowserRouter>
      </Context>
    );
    const circle = screen.getByTestId("circle-icon");
    expect(circle.className.indexOf("circle-icon")).toBeGreaterThanOrEqual(0);
  });
})