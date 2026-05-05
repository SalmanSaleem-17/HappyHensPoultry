import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const buffer = readFileSync(join(process.cwd(), "public/favicon.png"));
  const dataUrl = `data:image/png;base64,${buffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            borderRadius: size.width,
            overflow: "hidden",
            display: "flex",
            background: "#fdfaf2",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            width={size.width}
            height={size.height}
            alt=""
            style={{
              width: size.width,
              height: size.height,
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
