import { describe, it, expect } from "vitest";
import { createListingMetadata, BASE_URL, SITE_NAME } from "./constants";

describe("createListingMetadata", () => {
  describe("EN", () => {
    it("returns the English title", () => {
      expect(createListingMetadata("en").title).toBe("All Posts | JhoCore");
    });

    it("returns the English description", () => {
      expect(createListingMetadata("en").description).toBe(
        "Articles about software engineering, programming and creative coding."
      );
    });

    it("sets the EN blog URL in openGraph", () => {
      expect(createListingMetadata("en").openGraph.url).toBe(`${BASE_URL}/en/blog`);
    });

    it("sets the en_US locale in openGraph", () => {
      expect(createListingMetadata("en").openGraph.locale).toBe("en_US");
    });
  });

  describe("PT-BR", () => {
    it("returns the Portuguese title", () => {
      expect(createListingMetadata("pt-br").title).toBe("Todos os Posts | JhoCore");
    });

    it("returns the Portuguese description", () => {
      expect(createListingMetadata("pt-br").description).toBe(
        "Artigos sobre engenharia de software, programação e creative coding."
      );
    });

    it("sets the PT-BR blog URL in openGraph", () => {
      expect(createListingMetadata("pt-br").openGraph.url).toBe(`${BASE_URL}/pt-br/blog`);
    });

    it("sets the pt_BR locale in openGraph", () => {
      expect(createListingMetadata("pt-br").openGraph.locale).toBe("pt_BR");
    });
  });

  describe("shared fields", () => {
    it("always sets siteName to JhoCore", () => {
      expect(createListingMetadata("en").openGraph.siteName).toBe(SITE_NAME);
      expect(createListingMetadata("pt-br").openGraph.siteName).toBe(SITE_NAME);
    });

    it("always sets openGraph type to website", () => {
      expect(createListingMetadata("en").openGraph.type).toBe("website");
      expect(createListingMetadata("pt-br").openGraph.type).toBe("website");
    });

    it("openGraph title matches top-level title", () => {
      const en = createListingMetadata("en");
      expect(en.openGraph.title).toBe(en.title);

      const ptBr = createListingMetadata("pt-br");
      expect(ptBr.openGraph.title).toBe(ptBr.title);
    });
  });
});
