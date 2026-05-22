import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  const buffer = readFileSync(join(process.cwd(), "public/icon.png"));
  const dataUrl = `data:image/png;base64,${buffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div tw="w-full h-full flex items-center justify-center relative">
        <div tw="absolute top-0 left-0 w-full h-full flex rounded-full overflow-hidden bg-[#fdfaf2]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            width={size.width}
            height={size.height}
            alt=""
            tw="w-full h-full object-cover"
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
