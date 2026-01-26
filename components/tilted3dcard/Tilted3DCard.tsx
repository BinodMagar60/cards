"use client";

import Image from "next/image";
import { useRef } from "react";
import image from "./image.png";

export default function GlassTiltCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Card tilt
    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    // Image stays "inside"
    if (imageRef.current) {
      imageRef.current.style.transform = `
        translateZ(40px)
        rotateX(${rotateX * 0.3}deg)
        rotateY(${rotateY * 0.3}deg)
      `;
    }

    // Glare follows mouse
    if (glareRef.current) {
      glareRef.current.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255,255,255,0.35),
          transparent 60%
        )
      `;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (imageRef.current) imageRef.current.style.transform = "translateZ(0)";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  };

  return (
    <div className="perspective-[200px] w-full flex justify-center">
    klsjdflkjklf  
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          relative w-80 h-48 rounded-2xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-[0_25px_60px_rgba(0,0,0,0.35)]
          transition-transform duration-200 ease-out
          [transform-style:preserve-3d]
          overflow-hidden
        "
      >
        {/* Inner glass wall */}
        <div className="absolute inset-2 rounded-xl border border-white/10 bg-white/5" />

        {/* Image inside glass */}
        <div
          ref={imageRef}
          className="
            absolute inset-0
            flex items-center justify-center
            [transform-style:preserve-3d]
            transition-transform duration-200
          "
        >
          <Image
            src={image}
            alt="Glass Image"
            className="object-contain opacity-90"
            width={220}
            height={120}
          />
        </div>

        {/* Glass glare */}
        <div
          ref={glareRef}
          className="
            pointer-events-none
            absolute inset-0
            transition-all duration-150
          "
        />

        {/* Top glass highlight */}
        <div
          className="
            pointer-events-none
            absolute top-0 left-0 right-0 h-1/2
            bg-gradient-to-b
            from-white/25
            to-transparent
          "
        />
      </div>
    </div>
  );
}
