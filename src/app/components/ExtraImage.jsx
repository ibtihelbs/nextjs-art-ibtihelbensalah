"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/imageUrl";
import { useEffect, useState } from "react";

const Modal = ({
  isModalOpen,
  images,
  selectedIndex,
  projectTitle,
  onClose,
  onNext,
  onPrevious,
}) => {
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, onClose, onNext, onPrevious]);

  if (!isModalOpen || !images.length) return null;

  const image = images[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Close gallery"
      >
        ×
      </button>

      {/* Counter */}
      <div className="absolute left-5 top-5 z-50 text-sm text-white/80">
        {selectedIndex + 1} / {images.length}
      </div>

      {/* Previous */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="absolute left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white backdrop-blur-sm transition hover:bg-white/20 md:left-8"
        aria-label="Previous image"
      >
        ‹
      </button>

      {/* Image */}
      <div
        className="relative h-[85vh] w-[85vw] max-w-7xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={urlFor(image).width(1800).url()}
          alt={`${projectTitle} - Image ${selectedIndex + 1}`}
          fill
          priority
          className="object-contain"
          sizes="90vw"
          unoptimized
        />
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white backdrop-blur-sm transition hover:bg-white/20 md:right-8"
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
};

const ExtraImage = ({ extraImages = [], projectTitle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = extraImages.filter((image) => image?.asset?._ref);

  const openModal = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  const previousImage = () => {
    setSelectedIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  return (
    <>
      {/* Gallery */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((image, idx) => (
          <button
            key={image.asset._ref}
            type="button"
            onClick={() => openModal(idx)}
            className="relative h-80 overflow-hidden rounded-lg text-left"
          >
            <Image
              src={urlFor(image).width(800).height(600).url()}
              alt={`${projectTitle} - Image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Modal carousel */}
      <Modal
        isModalOpen={isModalOpen}
        images={images}
        selectedIndex={selectedIndex}
        projectTitle={projectTitle}
        onClose={closeModal}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  );
};

export default ExtraImage;
