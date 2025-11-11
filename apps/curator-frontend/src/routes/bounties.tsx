import { Combobox, Select } from '@geo/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { BountiesTab } from '@/components/bounties-tab';
import SectionTitle from '@/components/section-title';
import { DashboardIcon } from '@/icons/icons';

export const Route = createFileRoute('/bounties')({
  component: RouteComponent,
});
function RouteComponent() {
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        icon={<DashboardIcon color="#6833FF" width={32} height={32} />}
        content={<span className="main-title">Bounties</span>}
      />
      <div className="flex flex-col w-full items-start gap-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:px-4 sm:items-center gap-2 w-full">
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
        <div className="w-full">
          <BountiesTab />
        </div>
      </div>
    </div>
  );
}
