"use client";

import { useState } from "react";

type GalleryItem = {
  image: string;
  title: string;
  description: string;
};

type OurPlaceData = {
  title: string;
  description: string;
  gallery?: GalleryItem[];
};

type OurPlaceProps = {
  data: OurPlaceData;
};

export default function OurPlace({ data }: OurPlaceProps) {
  const gallery =
    data.gallery && data.gallery.length > 0
      ? data.gallery
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (gallery.length === 0) {
    return null;
  }

  const currentItem = gallery[currentIndex];

  return (
    <section
      id="our-place"
      className="our-place-page"
    >

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="our-place-header">

        <h1>{data.title}</h1>

        {data.description && (
          <p>{data.description}</p>
        )}

      </div>


      {/* =====================================================
          GALLERY
          ===================================================== */}

      <div className="our-place-gallery">


        {/* ===================================================
            MAIN IMAGE
            =================================================== */}

        <div className="our-place-gallery-main">

          <img
            key={currentItem.image}
            src={currentItem.image}
            alt={currentItem.title}
          />

        </div>


        {/* ===================================================
            CONTENT
            =================================================== */}

        <div className="our-place-gallery-content">

          <h2>
            {currentItem.title}
          </h2>

          {currentItem.description && (
            <p>
              {currentItem.description}
            </p>
          )}

        </div>


        {/* ===================================================
            THUMBNAILS
            =================================================== */}

        <div className="our-place-gallery-thumbnails">

          {gallery.map((item, index) => (

            <button
              key={`${item.image}-${index}`}
              type="button"
              className={`our-place-gallery-thumbnail ${
                index === currentIndex
                  ? "active"
                  : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View ${item.title}`}
            >

              <img
                src={item.image}
                alt={item.title}
              />

            </button>

          ))}

        </div>

      </div>

    </section>
  );
}