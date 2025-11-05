import { Button } from '@geo/design-system';
import IdProfileIcon from '../icons/id_profile.svg?react';
import TagCard from './tag-card';
export function CompleteProfileCard() {
  return (
    <div
      className="flex  flex-row 
             p-5 sm:py-5 sm:pl-5 sm:pr-0 gap-5
             w-full 
             bg-accent-blue-grey-bg rounded-2xl"
    >
      {/* Left side content */}
      <div
        className="flex flex-col justify-between items-start
               gap-5
               flex-grow w-full "
      >
        {/* Titles container */}
        <div className="flex flex-col items-start gap-1 w-full">
          <h2 className="small-title text-dark-text">Complete your profile</h2>
          <p className="body-copy text-dark-text">Boost your chance to get accepted to spaces and earn bounties</p>
        </div>
        {/* Button */}
        <Button>Get Started</Button>
      </div>

      {/* Right side image group */}
      <div
        className="relative flex items-center justify-end
                
               order-1 mt-4 sm:mt-0"
      >
        <IdProfileIcon className="w-[120px]  h-[98px]" />
      </div>
    </div>
  );
}

export function JoinSpaceCard() {
  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start
             p-5 gap-5
             w-full 
             bg-accent-blue-grey-bg rounded-2xl"
    >
      <div
        className="flex flex-col justify-center items-start  gap-5
               flex-grow w-full sm:w-[70%]"
      >
        {/* Titles container */}
        <div className="flex flex-col items-start gap-1 w-full">
          <h2 className="small-title text-dark-text">Join a space</h2>
          <p className="body-copy text-dark-text">
            Help organize knowledge across domains so we can trust the internet again. After you request to join a
            space, an editor will need to approve it.
          </p>
        </div>

        {/* Tags */}
        <div
          className="flex flex-row flex-wrap items-center gap-2 
                 w-full 
                 p-0"
        >
          <TagCard image="/images/education_icon.png" tag="Education" action="Join" />
          <TagCard image="/images/world_affairs_icon.png" tag="World affairs" action="Join" />
          <TagCard image="/images/health_icon.png" tag="Health" action="Join" />
          <TagCard image="/images/crypto_icon.png" tag="Crypto" action="Join" />
        </div>
      </div>
    </div>
  );
}

export function CompleteTrainingCard() {
  return (
    <div
      className="flex  flex-row 
             p-5 sm:py-5 sm:pl-5 sm:pr-0 gap-5
             w-full 
             bg-accent-blue-grey-bg rounded-2xl"
    >
      {/* Left side content */}
      <div
        className="flex flex-col justify-between items-start
               gap-5
               flex-grow w-full "
      >
        {/* Titles container */}
        <div className="flex flex-col items-start gap-1 w-full">
          <h2 className="small-title text-dark-text">Complete training</h2>
          <p className="body-copy text-dark-text">Watch videos and complete quizzes to learn how to win bounties!</p>
        </div>
        {/* Button */}
        <Button>Finish training</Button>
      </div>

      {/* Right side image group */}
      <div
        className="  relative flex items-center justify-end
                
               order-1 mt-4 sm:mt-0"
      >
        <img src="/images/Training_2x.png" alt="training" className="w-[120px]  h-[98px]" />
      </div>
    </div>
  );
}
