"use client";

import { useEffect, useRef, useState } from "react";

type HeroData = {
  title?: string;
  roller_words?: string[];
  description?: string;
  button_text?: string;
  button_url?: string;
  image?: string;
};

type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const words =
    data.roller_words && data.roller_words.length > 0
      ? data.roller_words
      : ["Γνώση", "Μάθηση", "Έμπνευση"];

  const dragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  /*
   * AUTOMATIC ROLLER
   */

  useEffect(() => {
    if (words.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) => {
        return (current + 1) % words.length;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  /*
   * MOUSE / TOUCH DRAG
   */

  useEffect(() => {
    const roller = rollerRef.current;

    if (!roller) return;

    const handlePointerDown = (event: PointerEvent) => {
      dragging.current = true;
      startX.current = event.clientX;
      startIndex.current = currentIndex;

      roller.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging.current) return;

      const difference = event.clientX - startX.current;

      const threshold = 110;

      if (Math.abs(difference) < threshold) return;

      const direction = difference > 0 ? -1 : 1;

      const movement = Math.floor(
        Math.abs(difference) / threshold
      );

      let nextIndex =
        startIndex.current + direction * movement;

      nextIndex =
        ((nextIndex % words.length) + words.length) %
        words.length;

      setCurrentIndex(nextIndex);
    };

    const handlePointerUp = () => {
      dragging.current = false;
    };

    roller.addEventListener("pointerdown", handlePointerDown);
    roller.addEventListener("pointermove", handlePointerMove);
    roller.addEventListener("pointerup", handlePointerUp);
    roller.addEventListener("pointercancel", handlePointerUp);

    return () => {
      roller.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      roller.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      roller.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      roller.removeEventListener(
        "pointercancel",
        handlePointerUp
      );
    };
  }, [currentIndex, words.length]);

  /*
   * KEYBOARD
   */

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();

      setCurrentIndex(
        (current) =>
          (current + 1) % words.length
      );
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setCurrentIndex(
        (current) =>
          (current - 1 + words.length) %
          words.length
      );
    }
  };

  return (
    <section
      ref={heroRef}
      className="hero"
    >
      {data.image && (
        <img
          src={data.image}
          alt=""
          className="hero-image"
        />
      )}

      <div className="hero-overlay" />

      <div className="hero-content">

        {data.title && (
          <h1 className="hero-title">
            {data.title}
          </h1>
        )}

        <div
          ref={rollerRef}
          className="hero-roller"
          tabIndex={0}
          role="button"
          aria-label="Change hero word"
          onKeyDown={handleKeyDown}
        >
          <div
            className="hero-roller-track"
            style={{
              transform: `translateX(-${
                currentIndex * 100
              }%)`,
            }}
          >
            {words.map((word, index) => (
              <div
                className="hero-roller-word"
                key={`${word}-${index}`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {data.description && (
          <p className="hero-description">
            {data.description}
          </p>
        )}

        {data.button_text && (
          <a
            href={data.button_url || "#"}
            className="hero-button"
          >
            {data.button_text}
          </a>
        )}

      </div>
    </section>
  );
}