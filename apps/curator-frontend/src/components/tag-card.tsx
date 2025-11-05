export default function TagCard({ image = '/images/education_icon.png', tag = 'Education', action = 'Join' }) {
  return (
    <div
      className="flex flex-row items-center p-2 gap-2
                 w-fit min-w-[8.5rem] h-9
                 bg-white shadow-[0_0.75rem_1rem_rgba(127,132,159,0.2)]
                 rounded-xl"
    >
      {/* Icon */}
      <div className="relative w-5 h-5 rounded-md overflow-hidden flex-shrink-0">
        {/* Accent background */}
        <div className="absolute inset-0 bg-primary-accent-pink" />
        {/* Image overlay */}
        <img src={image} alt={tag} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Text group */}
      <div className="flex flex-row items-center gap-1">
        <span className="tag-text text-dark-text text-sm sm:text-base">{tag}</span>
        <span className="tag-text text-dark-text text-sm sm:text-base">·</span>
        <span className="tag-text text-grey-light-text text-sm sm:text-base">{action}</span>
      </div>
    </div>
  );
}
