export default function TagCard({
  image = '/images/education_icon.png',
  tag = 'Education',
  action = 'Join',
  hasBackground = true,
  tagNameColor = 'text-dark-text',
}) {
  return (
    <div
      className={`flex flex-row items-center gap-2
            w-fit h-9
            rounded-xl
            ${hasBackground ? 'bg-white shadow-[0_0.75rem_1rem_rgba(127,132,159,0.2)]  p-2 ' : ''}`}
    >
      {/* Icon */}
      <div className="relative w-5 h-5 rounded-md overflow-hidden flex-shrink-0">
        {/* Image overlay */}
        <img src={image} alt={tag} className="absolute inset-0 w-full h-full object-cover" />
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
