"use client";
import { useState } from "react";

export default function ProductGallery({ images, alt }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="big sq">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[i]} alt={alt} />
      </div>
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((src, k) => (
            <button key={src} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
