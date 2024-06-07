import Head from "next/head";

export function SEO({ title, description = "" }) {
  const metaDescription = description || "A blog by Jhonattas Ferreira";

  const titleTemplate = `${title} | JhoCore`;

  return (
    <Head>
      <title>{titleTemplate}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  );
}
