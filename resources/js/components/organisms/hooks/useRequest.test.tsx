import React from "react";
import useRequest from "./useRequest";
import { cleanup, render, screen } from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";

// afterEach(() => cleanup());
// describe("useRequest unit test", () => {
//   it("useRequest unit test success", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useRequest({url: "https://jsonplaceholder.typicode.com/todos/", depth: []}));
//     await waitForNextUpdate();
//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.data.length).toBe(200);
//   });
//   it("useRequest unit test error", async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useRequest({url: "https://jsonplaceholder.typicode.com/todos/aaa", depth: []}));
//     await waitForNextUpdate();
//     expect(result.current.error).not.toBe(null);
//   });
// });
