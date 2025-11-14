import { Select, StyledCombobox } from '@geo/design-system';
import { spaceItems } from '@/data/spaces';
import TitleWithSubtitle from './title-with-subtitle';

export default function MyBountiesHeader() {
  return (
    <TitleWithSubtitle title="My bounties" subtitle="Self-assigned or allocated bounties will appear here">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
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
        <Select
          nameOfDropdown="Payout"
          items={[
            { label: 'Highest payout', value: 'Highest payout', isAllOption: false, isSelected: true },
            { label: 'P0', value: 'P0', isAllOption: false, isSelected: false },
            { label: 'P01', value: 'P01', isAllOption: false, isSelected: false },
            { label: 'P02', value: 'P02', isAllOption: false, isSelected: false },
            { label: 'P03', value: 'P03', isAllOption: false, isSelected: false },
          ]}
        />
      </div>
    </TitleWithSubtitle>
  );
}
