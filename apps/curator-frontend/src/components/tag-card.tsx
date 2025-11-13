export default function TagCard({
  image = '/images/spaces-images/Health.png',
  tag = 'Education',
  action = 'Join',
  hasBackground = true,
  tagNameColor = 'text-dark-text',
  imgSize = 5,
}) {
  return (
    <div
      className={`flex flex-row items-center gap-2
            w-fit 
            rounded-xl
            ${hasBackground ? 'bg-white shadow-[0_0.75rem_1rem_rgba(127,132,159,0.2)]  p-2 h-9' : 'h-5'}`}
    >
      {/* Icon */}
      <div className={` w-${imgSize} h-${imgSize} rounded-md overflow-hidden flex-shrink-0`}>
        {/* Image overlay */}
        <img src={image} alt={tag} className={` w-${imgSize} h-${imgSize} object-cover`} />
      </div>

      {/* Text group */}
      <div className="flex flex-row items-center gap-1">
        <span className={`tag-text ${tagNameColor} text-sm sm:text-base`}>{tag}</span>
        {action && <span className={`tag-text ${tagNameColor} text-sm sm:text-base`}>·</span>}
        {action && <span className="tag-text text-grey-light-text text-sm sm:text-base">{action}</span>}
      </div>
    </div>
  );
}
