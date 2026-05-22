// Satori (the renderer behind next/og's ImageResponse) accepts a non-standard
// `tw` prop for Tailwind-style utility classes. Augment React's HTMLAttributes
// so TypeScript accepts `<div tw="..." />` without complaining.
//
// The unused-generic `<T>` is required to match React's base interface
// signature when declaration-merging — the disable comments are intentional.
import "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    tw?: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ImgHTMLAttributes<T> {
    tw?: string;
  }
}
