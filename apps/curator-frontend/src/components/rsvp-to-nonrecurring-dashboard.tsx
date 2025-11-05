import { CommunicationCalls } from './communication-calls';
import MyBountiesHeader from './my-bounties-header';
import SectionTitle from './section-title';

export default function RSVPToNonRecurringDashboard() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <SectionTitle number={0} />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6 flex-[3]">
            <MyBountiesHeader />
          </div>
          <div className="flex-[1]">
            <CommunicationCalls />
          </div>
        </div>
      </div>
    </div>
  );
}
