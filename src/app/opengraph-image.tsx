import { ImageResponse } from "next/og";

export const alt = "Sujith Putta — Generative AI Developer & Product Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060606",
          padding: "60px 70px",
          color: "#EDEDED",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Radial Gradient Accents */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 94, 0, 0.28) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 229, 255, 0.22) 0%, transparent 70%)",
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#D4FF00",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#D4FF00",
              }}
            >
              SUJITH PUTTA // ARCHITECT & SYSTEMS
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: "0.1em",
            }}
          >
            <span>EDITION 2026</span>
            <span>·</span>
            <span>BENGALURU, IN</span>
          </div>
        </div>

        {/* Hero Title & Subtext */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              fontSize: "74px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "#FFFFFF",
            }}
          >
            SUJITH PUTTA
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "#FF5E00",
              letterSpacing: "-0.01em",
            }}
          >
            Generative AI Developer & Product Developer
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.65)",
              maxWidth: "920px",
              lineHeight: 1.45,
            }}
          >
            Sovereign Hybrid RAG (FAISS + Neo4j) · Deterministic Rust Safety Gates · FastAPI Microservices · Full-Stack Systems
          </div>
        </div>

        {/* Footer Badges & Coordinates */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              "RAG Pipelines",
              "Rust & Tokio",
              "FastAPI",
              "React 19 & Next.js",
              "Azure & AWS",
            ].map((badge) => (
              <div
                key={badge}
                style={{
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  fontSize: "13px",
                  fontFamily: "monospace",
                  color: "#EDEDED",
                }}
              >
                {badge}
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            sujith-putta-portfolio.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
