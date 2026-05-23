import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Christian Linares — Product Designer working remotely from Lima";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#ededed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(212,255,0,0.06), transparent 45%)",
        }}
      >
        {/* Top: brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: 1.5,
            color: "#8a8a8a",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#d4ff00",
            }}
          />
          <div style={{ display: "flex" }}>
            Christian Linares · Product Designer
          </div>
        </div>

        {/* Center: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 0.95,
            letterSpacing: -3,
            fontWeight: 300,
          }}
        >
          <div style={{ fontSize: 110, color: "#ededed", display: "flex" }}>
            Designing
          </div>
          <div
            style={{
              fontSize: 110,
              color: "#8a8a8a",
              fontStyle: "italic",
              display: "flex",
            }}
          >
            digital products
          </div>
          <div style={{ fontSize: 110, color: "#ededed", display: "flex" }}>
            with intent
            <span style={{ color: "#e91e63" }}>.</span>
          </div>
        </div>

        {/* Bottom: meta line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: 1.5,
            color: "#8a8a8a",
            textTransform: "uppercase",
            borderTop: "1px solid #1f1f1f",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>Portfolio · 2026</div>
          <div style={{ display: "flex" }}>christianlinares-h.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
