"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type HeroData = {
  title?: string;
  roller_words?: string[] | string;
  description?: string;
  button_text?: string;
  button_url?: string;
  image?: string;
};

type HeroProps = {
  data: HeroData;
};

export default function Hero({
  data,
}: HeroProps) {
  const rollerRef =
    useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [
    isTransitioning,
    setIsTransitioning,
  ] = useState(true);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  /*
   * =========================================================
   * WORDPRESS ROLLER WORDS
   * =========================================================
   */

  const words = useMemo(() => {
    let result: string[] = [];

    if (Array.isArray(data.roller_words)) {
      result = data.roller_words.flatMap(
        (word) =>
          String(word).split(/[|,\n\r]+/)
      );
    } else if (
      typeof data.roller_words === "string"
    ) {
      result = data.roller_words.split(
        /[|,\n\r]+/
      );
    }

    result = result
      .map((word) => word.trim())
      .filter(Boolean);

    return result;
  }, [data.roller_words]);

  /*
   * =========================================================
   * DUPLICATED WORDS FOR SEAMLESS LOOP
   * =========================================================
   */

  const carouselWords = useMemo(
    () => [...words, ...words],
    [words]
  );

  /*
   * =========================================================
   * RESET WHEN WORDPRESS DATA CHANGES
   * =========================================================
   */

  useEffect(() => {
    let secondFrame = 0;

    const firstFrame =
      requestAnimationFrame(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);

        secondFrame =
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
      });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [words]);

  /*
   * =========================================================
   * AUTOMATIC ROLLER
   * =========================================================
   */

  useEffect(() => {
    if (words.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (current) => current + 1
      );
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [words.length]);

  /*
   * =========================================================
   * SEAMLESS LOOP
   * =========================================================
   */

  useEffect(() => {
    if (
      currentIndex !== words.length
    ) {
      return;
    }

    const timer = setTimeout(() => {
      setIsTransitioning(false);

      setCurrentIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [
    currentIndex,
    words.length,
  ]);

  /*
   * =========================================================
   * POINTER / DRAG
   * =========================================================
   */

  useEffect(() => {
    const roller = rollerRef.current;

    if (!roller) return;

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      dragging.current = true;

      startX.current = event.clientX;
      startIndex.current =
        currentIndex;

      roller.setPointerCapture(
        event.pointerId
      );
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (!dragging.current) return;

      const difference =
        event.clientX -
        startX.current;

      const threshold = 100;

      if (
        Math.abs(difference) <
        threshold
      ) {
        return;
      }

      const movement = Math.floor(
        Math.abs(difference) /
          threshold
      );

      let nextIndex =
        startIndex.current +
        (difference > 0
          ? -movement
          : movement);

      if (nextIndex < 0) {
        nextIndex = 0;
      }

      if (
        nextIndex > words.length
      ) {
        nextIndex =
          words.length;
      }

      setCurrentIndex(nextIndex);
    };

    const handlePointerUp = (
      event: PointerEvent
    ) => {
      dragging.current = false;

      if (
        roller.hasPointerCapture(
          event.pointerId
        )
      ) {
        roller.releasePointerCapture(
          event.pointerId
        );
      }
    };

    roller.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    roller.addEventListener(
      "pointermove",
      handlePointerMove
    );

    roller.addEventListener(
      "pointerup",
      handlePointerUp
    );

    roller.addEventListener(
      "pointercancel",
      handlePointerUp
    );

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
  }, [
    currentIndex,
    words.length,
  ]);

  /*
   * =========================================================
   * KEYBOARD
   * =========================================================
   */

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      event.key === "ArrowRight"
    ) {
      event.preventDefault();

      setCurrentIndex(
        (current) => {
          if (
            current >=
            words.length
          ) {
            return 0;
          }

          return current + 1;
        }
      );
    }

    if (
      event.key === "ArrowLeft"
    ) {
      event.preventDefault();

      setCurrentIndex(
        (current) => {
          if (current <= 0) {
            return (
              words.length - 1
            );
          }

          return current - 1;
        }
      );
    }
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <section className="hero">

      {/* BACKGROUND IMAGE */}

      {data.image && (
        <img
          src={data.image}
          alt=""
          className="hero-image"
        />
      )}

      {/* NAVY FADE */}

      <div className="hero-overlay" />

      {/* CONTENT */}

      <div className="hero-content">

        {/* TITLE */}

        {data.title && (
          <h1 className="hero-title">
            {data.title
              .split("|")
              .map(
                (
                  line,
                  index,
                  lines
                ) => (
                  <span key={index}>
                    {line.trim()}

                    {index <
                      lines.length -
                        1 && <br />}
                  </span>
                )
              )}
          </h1>
        )}

        {/* ROLLER */}

        {words.length > 0 && (
          <div
            ref={rollerRef}
            className="hero-roller"
            tabIndex={0}
            role="region"
            aria-label="Hero words"
            onKeyDown={
              handleKeyDown
            }
          >
            <div
              className="hero-roller-track"
              style={{
                transform:
                  `translateX(-${
                    currentIndex *
                    100
                  }%)`,

                transition:
                  isTransitioning
                    ? "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)"
                    : "none",
              }}
            >
              {carouselWords.map(
                (
                  word,
                  index
                ) => (
                  <div
                    className="hero-roller-word"
                    key={`${word}-${index}`}
                  >
                    {word}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* DESCRIPTION */}

        {data.description && (
          <p className="hero-description">
            {data.description
              .split("|")
              .map(
                (
                  line,
                  index,
                  lines
                ) => (
                  <span key={index}>
                    {line.trim()}

                    {index <
                      lines.length -
                        1 && <br />}
                  </span>
                )
              )}
          </p>
        )}

        {/* BUTTON */}

        {data.button_text && (
          <Link
            href={data.button_url || "/"}
            className="hero-button"
          >
            {data.button_text}

            <span className="hero-button-arrow">
              →
            </span>
          </Link>
        )}

      </div>
    </section>
  );
}