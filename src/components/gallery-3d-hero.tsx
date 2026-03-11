"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// Must live in a client component — ssr:false is not allowed in Server Components.
const InfiniteGallery = dynamic(
  () => import("@/components/3d-gallery-photography"),
  { ssr: false }
);

type Props = ComponentProps<typeof InfiniteGallery>;

export default function Gallery3DHero(props: Props) {
  return <InfiniteGallery {...props} />;
}
