"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryProps = {
  name: string;
  prefix: "tiny" | "langenholtensen";
  count: number;
  preview: number[];
  livingAlt: string;
  detailAlt: string;
  copy: {
    galleryLabel: string;
    openPhoto: string;
    allPhotos: string;
    close: string;
    closeLabel: string;
    dialogLabel: string;
    previous: string;
    previousLabel: string;
    next: string;
    nextLabel: string;
    photoCount: string;
  };
};

function imagePath(prefix: GalleryProps["prefix"], index: number) {
  return `/images/${prefix}-${String(index + 1).padStart(2, "0")}.jpg`;
}

export function Gallery({ name, prefix, count, preview, livingAlt, detailAlt, copy }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") setActive((value) => (value === null ? null : (value - 1 + count) % count));
      if (event.key === "ArrowRight") setActive((value) => (value === null ? null : (value + 1) % count));
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [active, count]);

  return (
    <>
      <div className="gallery-grid" aria-label={`${copy.galleryLabel} ${name}`}>
        {preview.map((photoNumber, position) => {
          const index = photoNumber - 1;

          return (
            <button
              className="gallery-item"
              type="button"
              key={photoNumber}
              onClick={() => setActive(index)}
              aria-label={`${name}: ${copy.openPhoto} ${photoNumber}`}
            >
              <Image
                src={imagePath(prefix, index)}
                alt={`${name} – ${position === 0 ? livingAlt : `${detailAlt} ${position + 1}`}`}
                fill
                sizes={position === 0 ? "(max-width: 720px) 100vw, 50vw" : "(max-width: 720px) 50vw, 25vw"}
              />
              {position === preview.length - 1 && (
                <span className="gallery-count">{copy.allPhotos.replace("{count}", String(count))}</span>
              )}
            </button>
          );
        })}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${copy.dialogLabel} ${name}`}>
          <button
            className="lightbox-close"
            type="button"
            ref={closeButton}
            onClick={() => setActive(null)}
            aria-label={copy.closeLabel}
          >
            {copy.close}
            <span aria-hidden="true">×</span>
          </button>

          <div className="lightbox-image">
            <Image
              src={imagePath(prefix, active)}
              alt={`${name} – ${copy.photoCount
                .replace("{current}", String(active + 1))
                .replace("{total}", String(count))}`}
              fill
              sizes="100vw"
              priority
            />
          </div>

          <div className="lightbox-controls">
            <button type="button" onClick={() => setActive((active - 1 + count) % count)} aria-label={copy.previousLabel}>
              <span aria-hidden="true">←</span> {copy.previous}
            </button>
            <span aria-live="polite">
              {active + 1} / {count}
            </span>
            <button type="button" onClick={() => setActive((active + 1) % count)} aria-label={copy.nextLabel}>
              {copy.next} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
