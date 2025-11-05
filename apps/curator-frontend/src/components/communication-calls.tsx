import { BaseSelect } from '@geo/design-system/components/base-select';
import { CommunicationCallCard } from './communication-call';
import TitleWithSubtitle from './title-with-subtitle';

export function CommunicationCalls() {
  return (
    <TitleWithSubtitle title="Community calls" subtitle="">
      <div className="flex flex-col items-start  gap-3 w-full flex-grow-0 flex-shrink-0 ">
        <div className="flex flex-row items-center gap-2">
          <BaseSelect
            defaultValue="All Spaces"
            items={[
              { label: 'All Spaces', value: 'All Spaces' },
              { label: 'Design', value: 'design' },
              { label: 'Development', value: 'development' },
              { label: 'Research', value: 'research' },
            ]}
          />
          <BaseSelect
            defaultValue="All"
            items={[
              { label: 'All', value: 'All' },
              { label: 'None', value: 'None' },
            ]}
          />
        </div>

        <div className="flex flex-col items-start gap-10 w-full ">
          <CommunicationCallCard displayDate="Tuesday, October 27" />

          <CommunicationCallCard displayDate="Thursday, October 29" />
        </div>
      </div>
    </TitleWithSubtitle>
  );
}
