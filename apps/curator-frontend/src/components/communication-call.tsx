import { Divider } from '@geo/design-system';
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
      {/* Content container */}

      <div className="flex flex-col justify-around items-start gap-2 py-2 w-full">
        {/* Meeting name */}
        <div className="flex flex-col items-start gap-1.5 w-full ">
          <p className="tag-text w-[144px] h-[13px] flex items-center text-dark-text ">Weekly ontology call</p>

          {/* Time & dash & time row */}
          <div className="flex flex-row items-center gap-2 w-full">
            <span className="text-grey-light-text tag-text">12:00pm</span>
            <span className="text-grey-light-text tag-text">-</span>
            <span className="text-grey-light-text tag-text">1:00pm</span>
          </div>
        </div>

        {/* Additional tags */}
        <div className="flex flex-row  items-start gap-4 w-full">
          <TagCard
            image="/images/health_icon.png"
            tag="Health"
            hasBackground={false}
            action=""
            tagNameColor="text-grey-light-text"
          />
          <TagCard
            image="/images/mini_profile.png"
            tag="37 going"
            hasBackground={false}
            action=""
            tagNameColor="text-grey-light-text"
          />
        </div>
      </div>

      <Divider />
    </div>
  );
}
