import { BASE_URL } from "@/utils/constants";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
