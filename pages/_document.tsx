import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />

        {/* ✅ SEO meta tags */}
        <meta name="title" content="NaviCate | Smart Proposal Generator" />
        <meta
          name="description"
          content="Generate winning client proposals instantly with NaviCate — the smart tool for freelancers and small businesses."
        />

        {/* ✅ Social preview */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://navi-cate-k8aa.vercel.app/" />
        <meta property="og:title" content="NaviCate | Smart Proposal Generator" />
        <meta
          property="og:description"
          content="Generate professional proposals in seconds. Save time. Win more clients."
        />
        <meta property="og:image" content="/android-chrome-512x512.png" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NaviCate | Smart Proposal Generator" />
        <meta
          name="twitter:description"
          content="Generate winning proposals effortlessly with NaviCate."
        />
        <meta name="twitter:image" content="/android-chrome-512x512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
