"use client";
import { CldImage } from "next-cloudinary";

export default function Page() {
  return (
    <CldImage
      src="anime_ace_bb5_nkwy2z"
      width="500" // Transform the image: auto-crop to square aspect_ratio
      height="500"
      sizes="100vw"
      alt="img"
    />
  );
}
