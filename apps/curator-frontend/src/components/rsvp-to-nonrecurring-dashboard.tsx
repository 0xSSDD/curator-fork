import { Tabs } from '@geo/design-system';
import { BountyFilledIcon } from '@/icons/icons';
import { BountiesTab } from './bounties-tab';
import { CommunicationCalls } from './communication-calls';
import MyBountiesHeader from './my-bounties-header';
import SectionTitle from './section-title';
import { SpacesTab } from './spaces-tab';
import TitleWithSubtitle from './title-with-subtitle';

export default function RsvpToNonRecurringDashboard() {
  const tabs = [
    { value: 'Bounties', label: 'Bounties' },
    { value: 'Spaces', label: 'Spaces' },
  ];

  const panels = {
    Bounties: <BountiesTab />,
    Spaces: <SpacesTab />,
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <SectionTitle
          icon={<BountyFilledIcon width={32} height={32} />}
          content={<span className="main-title">0</span>}
        />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6 flex-[3]">
            <MyBountiesHeader />
            <TitleWithSubtitle title="Recommended for you" subtitle="">
              <Tabs tabs={tabs} panels={panels} defaultValue="Bounties" />
            </TitleWithSubtitle>
          </div>
          <div className="flex-[1]">
            <CommunicationCalls />
          </div>
        </div>
      </div>
    </div>
  );
}
