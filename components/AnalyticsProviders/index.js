import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const AnalyticsProviders = () => (
  <>
    <SpeedInsights />
    <Analytics />
  </>
);

export default AnalyticsProviders;
