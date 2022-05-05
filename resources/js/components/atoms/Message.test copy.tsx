import React from "react";
import ErrorMessage from "./ErrorMessage";
import { cleanup, render, screen } from "@testing-library/react";

afterEach(() => cleanup());
describe("ErrorMessage unit test", () => {
  it("配列で受け取ったメッセージが表示される", () => {
    const messages = [
      "メッセージ１",
      "メッセージ２",
      "メッセージ３",
    ];
    render(<ErrorMessage messages={messages}></ErrorMessage>);
    const errors = screen.getByTestId("errors");
    for (let i=0; i<errors.children.length; i++) {
      const error = errors.children.item(i);
      expect(error?.innerHTML).toBe(messages[i]);
    }
  });
  it("配列がからの場合、何も表示されない", () => {
    const messages: string[] = [];
    render(<ErrorMessage messages={messages}></ErrorMessage>);
    const errors = screen.getByTestId("errors");
    expect(errors.children.length).toBe(0);
  });
})