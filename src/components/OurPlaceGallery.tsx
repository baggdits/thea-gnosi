"use client";

import { useState } from "react";

type GalleryItem = {
  id: number;
  image: string;
  title: string;
  description: string;
};

type OurPlaceData = {
  title: string;
  description: string;
  gallery: GalleryItem[];
};

type OurPlaceGalleryProps = {
  data: OurPlaceData;
};

export default function OurPlaceGallery({
  data,
}: OurPlaceGalleryProps) {
  const gallery = data.gallery || [];

  const [currentIndex, setCurrentIndex] =
    useState(0);

  if (gallery.length === 0) {
    return (
      <div className="our-place-empty">
        <p>Δεν υπάρχουν διαθέσιμες εικόνες.</p>
      </div>
    );
  }

  const currentItem = gallery[currentIndex];

  const previousImage = () => {
    setCurrentIndex((current) =>
      current === 0
        ? gallery.length - 1
        : current - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <section className="our-place-gallery">

      {/* MAIN IMAGE */}

      <div className="our-place-gallery-main">

        <img
          key={currentItem.image}
          src={currentItem.image}
          alt={currentItem.title || data.title}
        />

        {/* LEFT ARROW */}

        {gallery.length > 1 && (
          <button
            type="button"
            className="gallery-arrow gallery-arrow-left"
            onClick={previousImage}
            aria-label="Προηγούμενη εικόνα"
          >
            ‹
          </button>
        )}

        {/* RIGHT ARROW */}

        {gallery.length > 1 && (
          <button
            type="button"
            className="gallery-arrow gallery-arrow-right"
            onClick={nextImage}
            aria-label="Επόμενη εικόνα"
          >
            ›
          </button>
        )}

      </div>

      {/* TITLE + DESCRIPTION */}

      <div className="our-place-gallery-content">

        {currentItem.title && (
          <h2>{currentItem.title}</h2>
        )}

        {currentItem.description && (
          <p>{currentItem.description}</p>
        )}

      </div>

      {/* THUMBNAILS */}

      <div className="our-place-gallery-thumbnails">

        {gallery.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`our-place-gallery-thumbnail ${
              index === currentIndex
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentIndex(index)
            }
            aria-label={`Προβολή ${
              item.title ||
              `εικόνας ${index + 1}`
            }`}
          >
            <img
              src={item.image}
              alt={
                item.title ||
                `Thumbnail ${index + 1}`
              }
            />
          </button>
        ))}

      </div>

    </section>
  );
}