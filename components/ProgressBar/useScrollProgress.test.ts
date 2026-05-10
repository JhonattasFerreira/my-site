// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useScrollProgress from "./useScrollProgress";

const setScrollState = ({
  scrollY,
  scrollHeight,
  innerHeight,
}: {
  scrollY: number;
  scrollHeight: number;
  innerHeight: number;
}) => {
  Object.defineProperty(window, "scrollY", { value: scrollY, writable: true, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, writable: true, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", { value: scrollHeight, writable: true, configurable: true });
};

beforeEach(() => {
  setScrollState({ scrollY: 0, scrollHeight: 1000, innerHeight: 500 });
});

describe("useScrollProgress", () => {
  it("starts with progress 0 when scrollY is 0", () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current.progress).toBe(0);
  });

  it("starts with scrolled false", () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current.scrolled).toBe(false);
  });

  it("updates progress when scroll event fires", () => {
    setScrollState({ scrollY: 250, scrollHeight: 1000, innerHeight: 500 });
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.progress).toBe(50);
  });

  it("sets scrolled to true after the first scroll event", () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.scrolled).toBe(true);
  });

  it("returns 0 when the page has no scrollable area", () => {
    setScrollState({ scrollY: 0, scrollHeight: 500, innerHeight: 500 });
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.progress).toBe(0);
  });

  it("removes the scroll listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useScrollProgress());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
