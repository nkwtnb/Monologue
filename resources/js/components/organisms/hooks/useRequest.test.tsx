import React from "react";
import useRequest from "./useRequest";
import { cleanup, render, screen } from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";
import axios from "axios";
import * as entryUtil from "@api/Entries";

afterEach(() => cleanup());
describe("useRequest unit test", () => {
  const mockAxios = jest.spyOn(axios, "get");
  mockAxios.mockResolvedValue(Promise.resolve([{data: 1}, {data: 2}]));
  // mockAxios.mockResolvedValue(Promise.resolve([{
  //   name: "1",
  //   id: 1,
  //   avatar: "",
  //   words: "",
  //   ogp_title: "",
  //   ogp_description: "",
  //   ogp_image: "",
  //   images: [],
  //   created_at: "",
  //   likes: 0,
  //   isLike: false,
  //   replyCount: 0
  // }]));

  it("useRequest unit test success", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRequest({name: "Naoki", filter: "post", authState: {name: "unit test", email: "test@example.com"}}));
    console.log(result.current.data);
    await waitForNextUpdate();
    console.log(result.current.data);
    // expect(result.current.isLoading).toBe(false);
    // expect(result.current.data.length).toBe(200);
  });
});
