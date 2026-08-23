import { ImageResponse } from "next/og";
import { author, siteDescription, siteUrl } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${author.name} — ${author.jobTitle}`;

/**
 * Site-wide share card. Case studies override this with their own cover image
 * through `openGraph.images` in their page metadata.
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
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: "900px",
          }}
        >
          {siteDescription}
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
