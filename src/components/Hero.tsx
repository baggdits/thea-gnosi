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
  const [isTransitioning, setIsTransitioning] = useState(true);

  const words =
    data.roller_words && data.roller_words.length > 0
      ? data.roller_words
      : ["Γνώση", "Μάθηση", "Έμπνευση"];

  /*
   * Duplicate the words.
   *
   * Example:
   * Γνώση → Μάθηση → Έμπνευση → Γνώση → Μάθηση → Έμπνευση
   */

  const carouselWords = [...words, ...words];

  const dragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  /*
   * AUTOMATIC ROLLER
   */

  useEffect(() => {
    if (words.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) => current + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  /*
   * SEAMLESS RESET
   *
   * When we reach the duplicated first word,
   * instantly move back to the real first word
   * after the animation has finished.
   */

  useEffect(() => {
    if (currentIndex !== words.length) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }, 750);

    return () => clearTimeout(timer);
  }, [currentIndex, words.length]);

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

      const movement = Math.floor(
        Math.abs(difference) / threshold
      );

      let nextIndex =
        startIndex.current +
        (difference > 0 ? -movement : movement);

      /*
       * Prevent going outside the carousel.
       */

      if (nextIndex < 0) {
        nextIndex = 0;
      }

      if (nextIndex > words.length) {
        nextIndex = words.length;
      }

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

      setCurrentIndex((current) => {
        if (current >= words.length) {
          return 0;
        }

        return current + 1;
      });
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setCurrentIndex((current) => {
        if (current <= 0) {
          return words.length - 1;
        }

        return current - 1;
      });
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
              transition: isTransitioning
                ? "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
          >
            {carouselWords.map((word, index) => (
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