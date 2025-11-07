import { Combobox, Select } from '@geo/design-system';
import TitleWithSubtitle from './title-with-subtitle';

export default function MyBountiesHeader() {
  return (
    <TitleWithSubtitle title="My bounties" subtitle="Self-assigned or allocated bounties will appear here">
      <div className="flex flex-row items-center gap-2">
        <Combobox
          defaultValue="All Spaces"
          items={[
            { label: 'All Spaces', value: 'All Spaces' },
            { label: 'Design', value: 'design' },
            { label: 'Development', value: 'development' },
            { label: 'Research', value: 'research' },
          ]}
        />
        <Select
          defaultValue="Open"
          items={[
            { label: 'Open', value: 'Open' },
            { label: 'Close', value: 'Close' },
          ]}
        />
        <Select
          defaultValue="Highest payout"
          items={[
            { label: 'Highest payout', value: 'Highest payout' },
            { label: 'P0', value: 'P0' },
            { label: 'P01', value: 'P01' },
          ]}
        />
      </div>
    </TitleWithSubtitle>
  );
}
