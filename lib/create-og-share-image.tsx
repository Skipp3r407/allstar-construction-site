import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const GOLD = "#d4a017";
const BG = "#111827";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT =
  "All-Star Custom Construction LLC — 5-star rated outdoor construction in Central Florida";

export async function createOgShareImage() {
  let logoSrc: string | undefined;
  try {
    const buf = await readFile(join(process.cwd(), "public/images/logo.png"));
    logoSrc = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    /* optional: logo may be present only in deployment assets */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(165deg, ${BG} 0%, #1f2937 48%, ${BG} 100%)`,
          padding: 48,
        }}
      >
        {logoSrc ? (
          <div
            style={{
              display: "flex",
              marginBottom: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logoSrc} alt="" height={130} style={{ objectFit: "contain" }} />
          </div>
        ) : (
          <div
            style={{
              marginBottom: 32,
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
            }}
          >
            All-Star Custom Construction LLC
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <svg width={68} height={68} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path fill={GOLD} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <svg width={68} height={68} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path fill={GOLD} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <svg width={68} height={68} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path fill={GOLD} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <svg width={68} height={68} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path fill={GOLD} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <svg width={68} height={68} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path fill={GOLD} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: GOLD,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          5-Star Rated
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 26,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          Central Florida outdoor construction
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
