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
      <div className="w-full aspect-video bg-secondary/10 rounded-2xl flex items-center justify-center border border-border">
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border group bg-card">
      <Image
        src={images[currentIndex]}
        alt={`${projectName} preview ${currentIndex + 1}`}
        fill
        className="object-cover transition-all duration-500"
        priority={currentIndex === 0} 
      />
      
      {/* จะแสดงปุ่มเลื่อนก็ต่อเมื่อมีรูปมากกว่า 1 รูป */}
      {images.length > 1 && (
        <>
          {/* ปุ่มย้อนกลับ */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 hover:bg-background text-foreground rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* ปุ่มถัดไป */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/80 hover:bg-background text-foreground rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* จุด Navigation ด้านล่าง */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-background/30 px-3 py-2 rounded-full backdrop-blur-sm">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm ${
                  index === currentIndex 
                    ? "bg-primary w-5" // ขยายจุดที่กำลังแอคทีฟให้กว้างขึ้น
                    : "bg-primary/40 hover:bg-primary/60"
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