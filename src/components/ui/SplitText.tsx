"use client";

import React from "react";

/**
 * Simple DOM-based text splitter — replaces gsap-trial/SplitText.
 * Renders spans with `visibility: hidden` (matching GSAP autoAlpha behavior)
 * so GSAP's autoAlpha: 0 → 1 controls visibility correctly.
 */

interface SplitTextProps {
  text: string;
  type?: "words" | "chars";
  className?: string;
  elementClassName?: string;
}

export const SplitText = ({
  text,
  type = "words",
  className = "",
  elementClassName = "",
}: SplitTextProps) => {
  const words = text.split(" ");

  if (type === "chars") {
    return (
      <span className={`inline ${className}`} aria-label={text}>
        {words.map((word, wIndex) => (
          <span key={wIndex} className="split-line inline-flex overflow-hidden">
            {word.split("").map((char, cIndex) => (
              <span
                key={cIndex}
                className={`split-char inline-block ${elementClassName}`}
                aria-hidden="true"
                style={{ visibility: "hidden" }}
              >
                {char}
              </span>
            ))}
            {wIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </span>
    );
  }

  // words mode
  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span key={index} className="split-line inline-flex overflow-hidden">
          <span
            className={`split-word inline-block ${elementClassName}`}
            aria-hidden="true"
            style={{ visibility: "hidden" }}
          >
            {word}
          </span>
          {index < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};
