import React from "react";
import useRequest from "./useRequest";
import { cleanup, render, screen } from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";
import axios from "axios";
import * as entryUtil from "@api/Entries";

afterEach(() => cleanup());
describe("useRequest unit test", () => {
  const mockGetEntries = jest.spyOn(entryUtil, "getEntries");
  mockGetEntries.mockResolvedValue(Promise.resolve([{
    name: "1",
    id: 1,
    avatar: "",
    words: "",
    ogp_title: "",
    ogp_description: "",
    ogp_image: "",
    images: [],
    created_at: "",
    likes: 1,
    isLike: false,
    replyCount: 0
  }]));
  const mockGetLikes = jest.spyOn(entryUtil, "getLikes");
  mockGetLikes.mockResolvedValue(Promise.resolve([{
    name: "1",
    id: 1,
    avatar: "",
    words: "",
    ogp_title: "",
    ogp_description: "",
    ogp_image: "",
    images: [],
    created_at: "",
    likes: 1,
    isLike: false,
    replyCount: 0
  }]));
  it("いいね（isLike）がtrueに更新されている", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRequest({name: "Naoki", filter: "post", authState: {name: "unit test", email: "test@example.com"}}));
    await waitForNextUpdate();
    expect(result.current.data[0].isLike).toBe(true);
  });
});
