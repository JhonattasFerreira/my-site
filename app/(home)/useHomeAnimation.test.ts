// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useHomeAnimation from "./useHomeAnimation";

const mockRect = {
  top: 100,
  left: 200,
  width: 30,
  height: 30,
  right: 230,
  bottom: 130,
} as DOMRect;

const mockNavRect = {
  top: 50,
  left: 100,
  right: 900,
  bottom: 70,
  width: 800,
  height: 20,
} as DOMRect;

const makeRectangleRef = (rect = mockRect) => ({
  current: { getBoundingClientRect: () => rect } as unknown as HTMLDivElement,
});

const makeNavRef = (rect = mockNavRect) => ({
  current: { getBoundingClientRect: () => rect } as unknown as HTMLDivElement,
});

const nullRef = { current: null };

function mockWindow({
  innerWidth = 1200,
  innerHeight = 800,
  reducedMotion = false,
} = {}) {
  Object.defineProperty(window, "innerWidth", {
    value: innerWidth,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", {
    value: innerHeight,
    writable: true,
    configurable: true,
  });
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: reducedMotion && query.includes("reduce"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );
}

beforeEach(() => {
  vi.useFakeTimers();
  mockWindow();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("useHomeAnimation", () => {
  describe("initial state", () => {
    it("starts with idle phase", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      expect(result.current.phase).toBe("idle");
    });

    it("starts with balls hidden", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      expect(result.current.ballsVisible).toBe(false);
    });

    it("starts with balls not jumping or trembling", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      expect(result.current.ballsJumping).toBe(false);
      expect(result.current.ballsTrembling).toBe(false);
    });

    it("starts with full ball opacity", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      expect(result.current.ballsOpacity).toBe(1);
    });

    it("exposes the BALLS config and BALL_SIZE", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      expect(result.current.balls).toHaveLength(4);
      expect(result.current.ballSize).toBeGreaterThan(0);
    });
  });

  describe("accessibility guards", () => {
    it("does not start animation when prefers-reduced-motion is set", () => {
      mockWindow({ reducedMotion: true });
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      act(() => {
        vi.runAllTimers();
      });
      expect(result.current.phase).toBe("idle");
    });

    it("does not start animation on viewports narrower than 962px", () => {
      mockWindow({ innerWidth: 961 });
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      act(() => {
        vi.runAllTimers();
      });
      expect(result.current.phase).toBe("idle");
    });
  });

  describe("animation phases", () => {
    it("transitions to falling phase after the initial 2000ms delay", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.phase).toBe("falling");
    });

    it("does not crash when rectangleRef is null", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(nullRef, makeNavRef())
      );
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.phase).toBe("falling");
    });

    it("shows balls after BALLS_APPEAR delay when phase is resting", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      act(() => {
        result.current.setPhase("resting");
      });
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current.ballsVisible).toBe(true);
    });

    it("transitions to approaching phase after BALLS_APPROACH delay", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      act(() => {
        result.current.setPhase("resting");
      });
      act(() => {
        vi.advanceTimersByTime(550);
      });
      expect(result.current.phase).toBe("approaching");
    });

    it("sets ballsJumping true after BALLS_JUMP delay", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      act(() => {
        result.current.setPhase("resting");
      });
      act(() => {
        vi.advanceTimersByTime(3750);
      });
      expect(result.current.ballsJumping).toBe(true);
    });

    it("sets ballsTrembling true after BALLS_TREMBLE delay", () => {
      const { result } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      act(() => {
        result.current.setPhase("resting");
      });
      act(() => {
        vi.advanceTimersByTime(8900);
      });
      expect(result.current.ballsTrembling).toBe(true);
    });
  });

  describe("cleanup", () => {
    it("cancels pending timers on unmount", () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");
      const { unmount } = renderHook(() =>
        useHomeAnimation(makeRectangleRef(), makeNavRef())
      );
      unmount();
      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });
  });
});
