"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCarouselProps {
  images: string[];
  projectName: string;
}

export function ProjectCarousel({ images, projectName }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-[#444444] rounded-[15px] flex items-center justify-center border border-white/19">
        <span className="text-[#ABB8C3] text-[14px]">No images available</span>
      </div>
    );
  }

  const nextSlide = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prevSlide = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  return (
    <div className="relative w-full aspect-video rounded-[15px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-white/19 group bg-[#333333]">
      <Image
        src={images[currentIndex]}
        alt={`${projectName} preview ${currentIndex + 1}`}
        fill
        className="object-cover transition-all duration-500"
        priority={currentIndex === 0}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] flex items-center justify-center bg-[#333333]/80 hover:bg-[#333333] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-white/19 hover:border-[#00EDFF]"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] flex items-center justify-center bg-[#333333]/80 hover:bg-[#333333] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-white/19 hover:border-[#00EDFF]"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 flex gap-[8px] z-10 bg-[#333333]/60 px-[12px] py-[8px] rounded-[25px]">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-[8px] rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#00EDFF] w-[20px]"
                    : "bg-white/30 w-[8px] hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}