import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import CircleIcon from "./CircleIcon";

afterEach(() => cleanup());
describe("atoms > CircleIcon", () => {
  it("サイズ未指定の場合、デフォルトサイズ（40px * 40px）であること", () => {
    const util = render(<CircleIcon image={"../../../img/userIcon.png"} />);
    expect(getComputedStyle(util.getByTestId("circle-icon").firstElementChild!).width).toBe("40px")
    expect(getComputedStyle(util.getByTestId("circle-icon").firstElementChild!).height).toBe("40px")
  });
  it("サイズ指定の場合、指定されたサイズであること", () => {
    const util = render(<CircleIcon image={"../../../img/userIcon.png"} width={60} height={60} />);
    expect(getComputedStyle(util.getByTestId("circle-icon").firstElementChild!).width).toBe("60px")
    expect(getComputedStyle(util.getByTestId("circle-icon").firstElementChild!).height).toBe("60px")
  });
});
