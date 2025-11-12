import { Select, StyledCombobox, type StyledComboboxItem } from '@geo/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { BountiesTab } from '@/components/bounties-tab';
import SectionTitle from '@/components/section-title';
import { spaceItems } from '@/data/spaces';
import { DashboardIcon } from '@/icons/icons';

export const Route = createFileRoute('/bounties')({
  component: RouteComponent,
});
function RouteComponent() {
  const [_spacesOptions, _setSpacesOptions] = useState<StyledComboboxItem[]>(
    spaceItems.map((c) => ({
      image: c.imagePath,
      value: c.id,
      label: c.name,
      selected: c.id === '0', // default selected
    })),
  );
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        icon={<DashboardIcon color="#6833FF" width={32} height={32} />}
        content={<span className="main-title">Bounties</span>}
      />
      <div className="flex flex-col w-full items-start gap-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
          <StyledCombobox
            multiple={true}
            nameOfDropdown="space"
            searchable={true}
            items={spaceItems.map((c) => ({
              image: c.imagePath,
              value: c.id,
              label: c.name,
              selected: c.id === '0', // default selected
            }))}
            onChange={(v) => {
              const selected = Array.isArray(v) ? v : [];
              console.log('Selected Value: ', selected);
            }}
          />
          <Select
            multiple={true}
            defaultValue={'All'}
            items={[
              { label: 'All', value: 'All' },
              { label: 'Open', value: 'Open' },
              { label: 'Close', value: 'Close' },
              { label: 'Option01', value: '01' },
              { label: 'Option02', value: '02' },
              { label: 'Option03', value: '03' },
            ]}
          />
          <Select
            defaultValue="Highest payout"
            items={[
              { label: 'Highest payout', value: 'Highest payout' },
              { label: 'P0', value: 'P0' },
              { label: 'P01', value: 'P01' },
              { label: 'P02', value: 'P02' },
              { label: 'P03', value: 'P03' },
            ]}
          />
        </div>
        <div className="w-full">
          <BountiesTab />
        </div>
      </div>
    </div>
  );
}
