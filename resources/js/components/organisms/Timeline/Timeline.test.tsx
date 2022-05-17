import React from "react";
import Timeline from "./Presenter";
import { cleanup, render, screen } from "@testing-library/react";
import * as entryUtil from "@api/Entries";
import { BrowserRouter } from "react-router-dom";

afterEach(() => cleanup());
describe("Timeline unit test", () => {
  it("配列で受け取ったメッセージが表示される > メッセージ表示[読み込み中]", async () => {
    // レンダリング、テスト
    const result = render(
      <BrowserRouter>
        <Timeline data={[]} isLoading={true}></Timeline>
      </BrowserRouter>
    );
    expect(screen.getByTestId("loading")).toBeTruthy();
  });
  it("配列で受け取ったメッセージが表示される > メッセージ表示[投稿がありません]", async () => {
    // レンダリング、テスト
    const result = render(
      <BrowserRouter>
        <Timeline data={[]} isLoading={false}></Timeline>
      </BrowserRouter>
    );
    expect(screen.getByTestId("no-data")).toBeTruthy();
  });
  it("配列で受け取ったメッセージが表示される > データが表示される", async () => {
    const resolveValue = [
      {
        name: "username",
        id: 1,
        avatar: "",
        words: "メッセージ１",
        ogp_title: "",
        ogp_description: "",
        ogp_image: "",
        images: [],
        created_at: "",
        likes: 1,
        isLike: false,
        replyCount: 0
      }
    ]
    // データ取得処理モック化
    const mockGetEntries = jest.spyOn(entryUtil, "getEntries");
    mockGetEntries.mockResolvedValue(Promise.resolve(resolveValue));
    const mockGetLikes = jest.spyOn(entryUtil, "getLikes");
    mockGetLikes.mockResolvedValue(Promise.resolve(resolveValue));

    // レンダリング、テスト
    const result = render(
      <BrowserRouter>
        <Timeline data={resolveValue} isLoading={false}></Timeline>
      </BrowserRouter>
    );
    expect(screen.getByTestId("post")).toBeTruthy();
    expect(result.asFragment()).toMatchSnapshot();
  });
})