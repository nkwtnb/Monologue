import React from "react";
import TImeline from "./TImeline";
import { cleanup, render, screen } from "@testing-library/react";

afterEach(() => cleanup());
describe("Timeline unit test", () => {
  it("配列で受け取ったメッセージが表示される", () => {
    const result = render(
      <TImeline filter="post" name="test"></TImeline>
    );
    console.log(screen.debug());
    expect(result.asFragment()).toMatchSnapshot();
  });
})