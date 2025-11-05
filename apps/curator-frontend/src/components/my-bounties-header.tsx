import { Select } from '@base-ui-components/react/select';
import { BaseSelect } from '@geo/design-system/components/base-select';
import TitleWithSubtitle from './title-with-subtitle';

export default function MyBountiesHeader() {
  return (
    <TitleWithSubtitle title="My bounties" subtitle="Self-assigned or allocated bounties will appear here">
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
        {/*   <Select.Root>
          <Select.Trigger
            className="flex flex-row items-center gap-[6px] px-[6px] pb-[1px]
                         w-[92px] h-[24px] border border-[#DBDBDB] rounded-md bg-white"
          >
            <span className="font-calibre text-[16px] leading-[13px] tracking-[-0.35px] text-[#2A2B2E]">Dropdown</span>
            <Select.Icon>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <title>icon</title>
                <path d="M3 5L6 8L9 5" stroke="#606060" strokeWidth="1" />
              </svg>
            </Select.Icon>
          </Select.Trigger>
        </Select.Root> */}
      </div>
    </TitleWithSubtitle>
  );
}
