import { Tabs } from '@geo/design-system';
import { BountiesTab } from './BountiesTab';
import { CommunicationCalls } from './communication-calls';
import MyBountiesHeader from './my-bounties-header';
import { SpacesTab } from './SpacesTab';
import SectionTitle from './section-title';
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
        <SectionTitle number={0} />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6 flex-[3]">
            <MyBountiesHeader />
            <TitleWithSubtitle title="Recommended for you" subtitle="">
              <Tabs tabs={tabs} panels={panels} defaultValue="overview" />
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
