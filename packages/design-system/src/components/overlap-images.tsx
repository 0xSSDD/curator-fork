interface OverlapImagesProps {
  images: string[]; // array of image URLs, max 3
}

export function OverlapImages({ images }: OverlapImagesProps) {
  return (
    <div className="flex items-center w-10 h-4 rounded-[4px] overflow-hidden">
      {images.slice(0, 3).map((src, i) => (
        <img
          key={`img_${i + 1}`}
          src={src}
          alt={`image-${i}`}
          className={`
            w-4 h-4 rounded-[4px] border border-white
            ${i !== 0 ? '-ml-[5px]' : ''}
            object-cover
            relative
            z-${i}  /* to stack properly, first image on top */
          `}
          style={{ position: 'relative' }}
        />
      ))}
    </div>
  );
}
