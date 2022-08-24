import React from "react";
import { cleanup, fireEvent, render, screen, } from "@testing-library/react";
import Email from "./Email";
import { act } from "react-dom/test-utils";
import * as Password from "../../api/Password";

afterEach(() => cleanup());
describe("page > Email", () => {
  it("初期値が空白であること", async () => {
    const utils = await render(<Email />);
    expect(utils.getByTestId("email")).toHaveValue("");
  });
  it("メッセージが表示されること", async () => {
    const mock = jest.spyOn(Password, "reset");
    mock.mockResolvedValue({ message: "mock value" });
    const utils = await render(<Email />);
    await act(async () => {
      await fireEvent.click(utils.getByRole("submit"));
    });
    expect(await screen.findByTestId("message")).toBeInTheDocument();
  });
  it("エラーメッセージが表示されるこど", async () => {
    const mock = jest.spyOn(Password, "reset");
    mock.mockRejectedValue({
      errors: {
        field1 : [
          "message1-1",
          "message1-2",
        ],
        field2 : [
          "message2-1",
          "message2-2",
        ],
      }
    });
    const utils = await render(<Email />);
    await act(async () => {
      await fireEvent.click(utils.getByRole("submit"));
    });
    expect(await (await screen.findByTestId("errors")).children.length).toBe(4)
  });  
})