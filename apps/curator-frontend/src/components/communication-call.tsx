import { ActionPopover, Divider, Tag } from '@geo/design-system';
import Tooltip from '@geo/design-system/components/tooltip';
import React from 'react';
import { AddToCalenederIcon, ClearIcon, GoingArrowIcon, HoriDotsIcon, RecurringIcon } from '@/icons/icons';
import TagCard from './tag-card';

type Props = {
  displayDate: string;
};
export function CommunicationCallCard({ displayDate }: Props) {
  return (
    <div className="flex flex-col items-start  w-full  gap-2">
      {/* Title: Tuesday, October 27 */}
      <h2 className="small-title flex items-center text-dark-text ">{displayDate}</h2>
      <Divider />
      <MeetingCard
        title="Weekly ontology call"
        startTime="12:00pm"
        endTime="1:00pm"
        isRecurring={true}
        recurringTooltip="Every Wednesday"
        tags={[
          { image: '/images/health_icon.png', tag: 'Health' },
          { image: '/images/mini_profile.png', tag: '111 going' },
        ]}
        goingCount={37}
        isGoing={false}
        onActionChange={(action, scope) => console.log(`User chose: ${action} (${scope})`)}
      />
      <Divider />
      <MeetingCard
        title="News articles discussion"
        startTime="4:30pm"
        endTime="5:00pm"
        isRecurring={true}
        recurringTooltip="Every Sundy"
        tags={[
          { image: '/images/crypto_icon.png', tag: 'Crypto' },
          { image: '/images/mini_profile.png', tag: '122 going' },
        ]}
        goingCount={12}
        isGoing={true}
        onActionChange={(action, scope) => console.log(`User chose: ${action} (${scope})`)}
      />
      <Divider />
      <MeetingCard
        title="Let’s talk types!"
        startTime="4:30pm"
        endTime="5:00pm"
        isRecurring={false}
        tags={[
          { image: '/images/crypto_icon.png', tag: 'Crypto' },
          { image: '/images/mini_profile.png', tag: '300 going' },
        ]}
        goingCount={12}
        isGoing={false}
        onActionChange={(action, scope) => console.log(`User chose: ${action} (${scope})`)}
      />
      <Divider />
      <MeetingCard
        title="Let’s talk types!"
        startTime="4:30pm"
        endTime="5:00pm"
        isRecurring={false}
        tags={[
          { image: '/images/crypto_icon.png', tag: 'Crypto' },
          { image: '/images/mini_profile.png', tag: '4 going' },
        ]}
        goingCount={12}
        isGoing={true}
        onActionChange={(action, scope) => console.log(`User chose: ${action} (${scope})`)}
      />
      <Divider />
    </div>
  );
}

type Step = 'actions' | 'confirm' | 'recurringConfirm';
type ActionType = 'going' | 'removeGoing' | null;

interface EventActionProps {
  isRecurring: boolean;
  isGoing: boolean;
  onChange?: (action: 'going' | 'removeGoing', scope: 'this' | 'all') => void;
}

export function EventAction({ isRecurring, isGoing, onChange }: EventActionProps) {
  const [step, setStep] = React.useState<Step>('actions');
  const [currentAction, setCurrentAction] = React.useState<ActionType>(null);

  const handleActionClick = (action: ActionType) => {
    setCurrentAction(action);
    setStep('confirm');
  };

  const handleConfirmYes = () => {
    if (isRecurring) {
      setStep('recurringConfirm');
    } else {
      finalizeAction('this');
    }
  };

  const finalizeAction = (scope: 'this' | 'all') => {
    if (currentAction) {
      onChange?.(currentAction, scope);
      alert(currentAction === 'going' ? `Marked as going (${scope})` : `Removed going (${scope})`);
    }
    setStep('actions');
    setCurrentAction(null);
  };

  // Define items per step
  const items =
    step === 'actions'
      ? [
          !isGoing
            ? {
                label: 'Going?',
                icon: <GoingArrowIcon />,
                onClick: () => handleActionClick('going'),
              }
            : {
                label: 'Remove going',
                icon: <GoingArrowIcon />,
                onClick: () => handleActionClick('removeGoing'),
              },
          {
            label: 'Add To Calendar',
            icon: <AddToCalenederIcon />,
            onClick: () => alert('Add to calendar'),
          },
        ]
      : step === 'confirm'
        ? [
            { label: 'Yes', onClick: handleConfirmYes, icon: isRecurring ? <GoingArrowIcon /> : null },
            { label: 'No', onClick: () => setStep('actions') },
          ]
        : [
            { label: 'This time', onClick: () => finalizeAction('this') },
            { label: 'Every time', onClick: () => finalizeAction('all') },
          ];

  return (
    <ActionPopover
      trigger={
        isGoing ? <ClearIcon className="size-5 cursor-pointer" /> : <HoriDotsIcon className="size-5 cursor-pointer" />
      }
      title={step !== 'actions' ? { label: 'Back', onClick: () => setStep('actions') } : undefined}
      items={items}
    />
  );
}

interface MeetingCardProps {
  title: string;
  startTime: string;
  endTime: string;
  isRecurring?: boolean;
  recurringTooltip?: string; // e.g., "Every Wednesday"
  tags: { image: string; tag: string }[];
  goingCount: number;
  isGoing: boolean;
  onActionChange: (action: string, scope: string) => void;
  variant?: 'default' | 'withGoingTag';
}

export function MeetingCard({
  title,
  startTime,
  endTime,
  isRecurring = false,
  recurringTooltip = '',
  tags,
  isGoing,
  onActionChange,
}: MeetingCardProps) {
  return (
    <div className="flex flex-col justify-around items-start gap-4 py-2 w-full">
      {/* Meeting Name */}
      <div className="flex flex-col items-start gap-1.5 w-full">
        <p className="text-dark-text tag-text flex items-center">{title}</p>

        {/* Time & dash & time */}
        <div className={`flex flex-row items-${isRecurring ? 'end' : 'center'} gap-2 w-full`}>
          {isRecurring && recurringTooltip ? (
            <Tooltip content={recurringTooltip}>
              <RecurringIcon />
            </Tooltip>
          ) : null}
          <span className="text-grey-light-text tag-text">{startTime}</span>
          <span className="text-grey-light-text tag-text">-</span>
          <span className="text-grey-light-text tag-text">{endTime}</span>
        </div>
      </div>

      {/* Additional tags and actions */}
      <div className={`flex flex-row items-${isGoing ? 'center' : 'end'} justify-between w-full`}>
        <div className="flex flex-row items-center gap-4 w-full">
          {tags.map(({ image, tag }, i) => (
            <TagCard
              key={`card_tag_${i + 1}`}
              image={image}
              tag={tag}
              hasBackground={false}
              action=""
              tagNameColor="text-grey-light-text"
            />
          ))}
        </div>

        {isGoing ? (
          <div className="flex flex-row items-center gap-2 mx-auto">
            <Tag variant="going" text="GOING" />
            <EventAction isRecurring={isRecurring} isGoing={isGoing} onChange={onActionChange} />
          </div>
        ) : (
          <EventAction isRecurring={isRecurring} isGoing={isGoing} onChange={onActionChange} />
        )}
      </div>
    </div>
  );
}
