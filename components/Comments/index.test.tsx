import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import Comments from "./index";

vi.mock("@giscus/react", () => ({
  default: vi.fn((props) => <div data-testid="giscus" {...props} />),
}));

import Giscus from "@giscus/react";

beforeEach(() => {
  vi.clearAllMocks();
});

const getLastProps = () => vi.mocked(Giscus).mock.calls.at(-1)![0];

describe("Comments", () => {
  it("renders the Giscus widget", () => {
    const { getByTestId } = render(<Comments lang="en" />);
    expect(getByTestId("giscus")).toBeInTheDocument();
  });

  it("passes the correct repo and category config", () => {
    render(<Comments lang="en" />);
    const props = getLastProps();
    expect(props).toMatchObject({
      repo: "JhonattasFerreira/my-site",
      repoId: "R_kgDOLtiOcg",
      category: "Announcements",
      categoryId: "DIC_kwDOLtiOcs4C8sF7",
    });
  });

  it("passes pathname mapping", () => {
    render(<Comments lang="en" />);
    expect(getLastProps()).toMatchObject({ mapping: "pathname" });
  });

  it("maps pt-br to pt when passing lang to Giscus", () => {
    render(<Comments lang="pt-br" />);
    expect(getLastProps()).toMatchObject({ lang: "pt" });
  });

  it("passes en lang unchanged to Giscus", () => {
    render(<Comments lang="en" />);
    expect(getLastProps()).toMatchObject({ lang: "en" });
  });

  it("loads comments lazily", () => {
    render(<Comments lang="en" />);
    expect(getLastProps()).toMatchObject({ loading: "lazy" });
  });
});
