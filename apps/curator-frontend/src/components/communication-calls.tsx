import { Select, StyledCombobox } from '@geo/design-system';
import { spaceItems } from '@/data/spaces';
import { CommunicationCallCard } from './communication-call';
import TitleWithSubtitle from './title-with-subtitle';

export function CommunicationCalls() {
  return (
    <TitleWithSubtitle title="Community calls" subtitle="">
      <div className="flex flex-col items-start  gap-3 w-full flex-grow-0 flex-shrink-0 ">
        <div className="flex flex-row items-center gap-2">
          <StyledCombobox
            multiple={true}
            nameOfDropdown="space"
            searchable={true}
            items={spaceItems.map((c) => ({
              image: c.imagePath,
              value: c.id,
              label: c.name,
              isSelected: c.id === '0',
              isAllOption: c.id === '0',
            }))}
            onChange={(v) => {
              const selected = Array.isArray(v) ? v : [];
              console.log('Selected Value: ', selected);
            }}
          />
          <Select
            nameOfDropdown="Status"
            multiple={true}
            items={[
              { label: 'All', value: 'All', isAllOption: true, isSelected: true },
              { label: 'Open', value: 'Open', isAllOption: false, isSelected: false },
              { label: 'Close', value: 'Close', isAllOption: false, isSelected: false },
              { label: 'Option01', value: '01', isAllOption: false, isSelected: false },
              { label: 'Option02', value: '02', isAllOption: false, isSelected: false },
              { label: 'Option03', value: '03', isAllOption: false, isSelected: false },
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
