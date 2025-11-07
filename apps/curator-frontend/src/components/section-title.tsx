import { BountyFilledIcon } from '@/icons/icons';

interface SectionTitleProps {
  number: number;
}

export default function SectionTitle({ number }: SectionTitleProps) {
  return (
    <div
      className="
        relative
        flex flex-row items-center
        gap-[12px]
        w-[69px] h-[46px]
        main-title
        text-dark-text
      "
    >
      {/* Icon container */}
      <BountyFilledIcon width={32} height={32} />

      {/* Text */}
      <div className="w-[25px] h-[46px] flex items-center flex-none order-1">{number}</div>
    </div>
  );
}
