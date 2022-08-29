import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import CardButton from "./CardButton";

afterEach(() => cleanup());
describe("atoms > CardButton", () => {
  it("submitボタンの時、primaryクラスが付与される", () => {
    const util = render(<CardButton isSubmit={true} label="ボタンラベル"/>);
    expect(util.getByTestId("card-button")).toHaveClass("btn-primary");
  });
  it("submitボタン以外の時、outline-primaryクラスが付与される", () => {
    const util = render(<CardButton isSubmit={false} label="ボタンラベル"/>);
    expect(util.getByTestId("card-button")).toHaveClass("btn-outline-primary");
  });
})