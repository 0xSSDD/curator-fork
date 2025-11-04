import { Button } from '@geo/design-system';
import IdProfileIcon from '../icons/id_profile.svg?react';
export default function CompleteProfileCard() {
  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start
             p-5 sm:py-5 sm:pl-5 sm:pr-0 gap-5
             w-full max-w-[672px] 
             bg-accent-blue-grey-bg rounded-2xl"
    >
      {/* Left side content */}
      <div
        className="flex flex-col justify-center items-start
               gap-5
               flex-grow w-full sm:w-[70%]"
      >
        {/* Titles container */}
        <div className="flex flex-col items-start gap-1 w-full">
          <h2
            className="font-calibre font-semibold text-lg sm:text-[19px] leading-[1.1]
                   tracking-[-0.5px] text-dark-text"
          >
            Complete your profile
          </h2>

          <p
            className="font-calibre font-normal text-base sm:text-[18px] leading-[1.2]
                   tracking-[-0.35px] text-dark-text"
          >
            Boost your chance to get accepted to spaces and earn bounties
          </p>
        </div>

        {/* Button */}
        <Button>Get Started</Button>
      </div>

      {/* Right side image group */}
      <div
        className="relative flex items-center justify-end
                
               order-1 mt-4 sm:mt-0"
      >
        <IdProfileIcon className="max-w-full max-h-full" />
      </div>
    </div>
  );
}
