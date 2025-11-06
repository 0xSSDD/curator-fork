import OriginalCombobox from '@geo/design-system/components/base-combobox';
import { BaseSelect } from '@geo/design-system/components/base-select';
import TitleWithSubtitle from './title-with-subtitle';

export default function MyBountiesHeader() {
  return (
    <TitleWithSubtitle title="My bounties" subtitle="Self-assigned or allocated bounties will appear here">
      <div className="flex flex-row items-center gap-2">
        <OriginalCombobox
          defaultValue="All Spaces"
          items={[
            { label: 'All Spaces', value: 'All Spaces' },
            { label: 'Design', value: 'design' },
            { label: 'Development', value: 'development' },
            { label: 'Research', value: 'research' },
          ]}
        />
        <BaseSelect
          defaultValue="Open"
          items={[
            { label: 'Open', value: 'Open' },
            { label: 'Close', value: 'Close' },
          ]}
        />
        <BaseSelect
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
