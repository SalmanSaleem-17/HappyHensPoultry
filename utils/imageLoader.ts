// Global next/image loader.
// - Cloudinary URLs → use Cloudinary's CDN transforms (f_auto, c_limit, w, q)
// - Anything else (e.g. /public/*.jpg)  → pass through unchanged
//
// Registered in next.config.ts via { images: { loader: "custom", loaderFile } }
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.includes("res.cloudinary.com/")) {
    const params = [
      "f_auto",
      "c_limit",
      `w_${width}`,
      `q_${quality ?? "auto"}`,
    ].join(",");
    return src.replace("/upload/", `/upload/${params}/`);
  }
  return src;
}
