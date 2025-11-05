import { Select } from '@base-ui-components/react/select';

interface SelectItem {
  label: string;
  value: string;
}

interface BaseSelectProps {
  items: SelectItem[];
  defaultValue?: string; // optional default selected value
}

export function BaseSelect({ items, defaultValue }: BaseSelectProps) {
  return (
    <Select.Root defaultValue={defaultValue}>
      {/* Trigger (button that opens the list) */}
      <Select.Trigger
        className="flex flex-row items-center justify-between gap-[6px] px-[6px] pb-[1px] 
                        w-auto min-w-[80px] max-w-full h-[24px] border border-grey-light rounded-md bg-white"
      >
        <Select.Value className="tag-text text-dark-text" />
        <Select.Icon>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <title>icon</title>
            <path d="M3 5L6 8L9 5" stroke="#606060" strokeWidth="1" />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      {/* Dropdown list */}
      <Select.Portal>
        <Select.Positioner className="outline-none select-none z-10" sideOffset={8}>
          <Select.Popup
            className="group origin-[var(--transform-origin)] bg-clip-padding rounded-md bg-white 
                       text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 
                       transition-[transform,scale,opacity] 
                       data-[ending-style]:scale-90 data-[ending-style]:opacity-0 
                       data-[starting-style]:scale-90 data-[starting-style]:opacity-0"
          >
            <Select.List className="relative py-1 overflow-y-auto max-h-[var(--available-height)] bg-white border border-gray-200 rounded-md shadow-md">
              {items.map(({ label, value }) => (
                <Select.Item
                  key={value}
                  value={value}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-800 rounded cursor-pointer 
                             hover:bg-gray-100 data-[highlighted]:bg-gray-900 data-[highlighted]:text-white"
                >
                  {/* SVG checkmark indicator */}
                  <Select.ItemIndicator className="w-3 h-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <title>icon</title>
                      <path
                        d="M3 6L5 8L9 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Select.ItemIndicator>

                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
