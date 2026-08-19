import { ImageResponse } from "next/og";
import { author, shareHeadline, siteUrl } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${author.name} — ${author.jobTitle}`;

/**
 * Site-wide share card. Case studies override this with their own cover image
 * through `openGraph.images` in their page metadata.
 *
 * The headline is `shareHeadline`, a short line written for this card — not
 * `siteDescription`. The meta description runs 150-160 characters by design,
 * which at display size wrapped to six lines, overflowed the 630px canvas and
 * covered the domain line. Keep anything used here under ~60 characters.
 *
 * ImageResponse renders through satori, which supports flexbox only — every
 * container with more than one child needs an explicit `display: "flex"`.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#121212",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#ffffffb3" }}>
          {author.name} / {author.jobTitle}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            maxWidth: "940px",
          }}
        >
          {shareHeadline}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#ffffff66",
          }}
        >
          {siteUrl.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
