import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-stone-900/80 hover:bg-stone-800 border-2 border-stone-700 transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 text-stone-200" />
      </button>

      {/* Previous Button */}
      {onPrev && images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 p-3 bg-stone-900/80 hover:bg-stone-800 border-2 border-stone-700 transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8 text-stone-200" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`World showcase ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain border-4 border-stone-700 shadow-2xl"
        />

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-stone-900/90 border-2 border-stone-700">
            <span className="text-sm font-bold text-stone-200">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Next Button */}
      {onNext && images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 p-3 bg-stone-900/80 hover:bg-stone-800 border-2 border-stone-700 transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8 text-stone-200" />
        </button>
      )}
    </div>
  );
}
