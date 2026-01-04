"use client";
import Image from "next/image";
import { useRef } from "react";

export default function TiltCard() {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    return (
        
            <div className="perspective-normal hover:z-50 w-full">
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative hover:scale-110 hover:z-20 w-full h-44 bg-purple-500 rounded-xl shadow-2xl hover:shadow-purple-400 hover:border-2 hover:border-purple-600 transition-transform duration-200 ease-out flex items-center justify-center text-white text-xl font-semibold"
                >
                    Card
                </div>
            </div>
    );
}
