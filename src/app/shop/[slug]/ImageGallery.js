// app/shop/[slug]/ImageGallery.js (Client Component)
"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({
  mainImage: initialMain,
  additionalImages,
}) {
  const [mainImage, setMainImage] = useState(initialMain);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {mainImage && (
        <div className="relative h-full" onClick={() => setModalOpen(true)}>
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            className="object-cover w-full rounded-lg"
            priority
          />
        </div>
      )}

      {additionalImages.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {additionalImages.map((img, index) => (
            <div
              key={index}
              className="relative h-40 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setMainImage(img)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
      <div
        className={`${modalOpen ? "block" : "hidden"} h-screen w-screen bg-amber-400 z-50 fixed top-0 left-0 flex items-center justify-center`}
        onClick={() => setModalOpen(false)}
      >
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          className="object-contain w-full rounded-lg"
          priority
        />
      </div>
    </>
  );
}
