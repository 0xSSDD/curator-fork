import { Tag } from '@geo/design-system/components/tag';
import { BountyFilledIcon, CompletedIcon, GrayCircleIcon, UnComletedIcon } from '@/icons/icons';

export default function OnboardingChecklist() {
  return (
    <section className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="w-full   medium-title flex items-center text-dark-text flex-grow-0">Onboarding checklist</h2>

      {/* Checklist Container */}
      <div className="flex flex-col justify-between gap-8 p-5 w-[320px] h-[241px] bg-white border border-gray-300 rounded-[16px]">
        <ProgressBar progress={5} />

        <div className="flex flex-col gap-3">
          <StepItem text={'Complete your profile'} isCompleted={true} isWaiting={false} />
          <StepItem text={'Join your first space'} isCompleted={false} isWaiting={true} />
          <StepItem text={'Complete training'} isCompleted={false} isWaiting={false} />
          <StepItem text={'Join one community call'} isCompleted={false} isWaiting={false} />
        </div>
        <Tag variant="points" icon={<BountyFilledIcon />} text="+3K" />
      </div>
    </section>
  );
}

type StepItemProps = {
  text: string;
  isCompleted: boolean;
  isWaiting: boolean;
};

function StepItem({ text, isCompleted, isWaiting }: StepItemProps) {
  return (
    <div className="flex items-center gap-3 w-full relative">
      <div className="w-3 h-3 ">
        {isCompleted ? <CompletedIcon /> : isWaiting ? <UnComletedIcon /> : <GrayCircleIcon />}
      </div>

      <span className={`tag-text ${isCompleted || isWaiting ? 'text-dark-text' : 'text-grey-light-text'}`}>{text}</span>
    </div>
  );
}

type ProgressBarProps = {
  progress: number; // progress value between 0 and 100
  isCompleted?: boolean; // optional flag to override progress and styles
};
export function ProgressBar({ progress, isCompleted = false }: ProgressBarProps) {
  const displayProgress = isCompleted ? 100 : progress;

  return (
    <div className="flex justify-between items-center w-full gap-5">
      {/* Progress % */}
      <span className="text-[16px] font-normal leading-[13px] text-black">{displayProgress}%</span>

      {/* Progress bar container */}
      <div className="relative flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
        {/* Progress fill */}
        <div className={'absolute top-0 left-0 h-1 rounded-full bg-black'} style={{ width: `${displayProgress}%` }} />
      </div>
    </div>
  );
}
