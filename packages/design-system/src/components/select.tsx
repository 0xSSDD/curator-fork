import { Select as BaseSelect } from '@base-ui-components/react/select';

interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  items: SelectItem[];
  defaultValue?: string; // optional default selected value
}

export function Select({ items, defaultValue }: SelectProps) {
  return (
    <BaseSelect.Root defaultValue={defaultValue}>
      {/* Trigger (button that opens the list) */}
      <BaseSelect.Trigger
        className="flex flex-row items-center justify-between gap-[6px] px-[6px] pb-[1px] 
                        w-auto min-w-[80px] max-w-full h-[24px] border border-grey-light rounded-md bg-white"
      >
        <BaseSelect.Value className="tag-text text-dark-text" />
        <BaseSelect.Icon>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <title>icon</title>
            <path d="M3 5L6 8L9 5" stroke="#606060" strokeWidth="1" />
          </svg>
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      {/* Dropdown list */}
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="outline-none select-none z-10" sideOffset={8}>
          <BaseSelect.Popup
            className="group origin-[var(--transform-origin)] bg-clip-padding rounded-md bg-white 
                       text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 
                       transition-[transform,scale,opacity] 
                       data-[ending-style]:scale-90 data-[ending-style]:opacity-0 
                       data-[starting-style]:scale-90 data-[starting-style]:opacity-0"
          >
            <BaseSelect.List className="relative py-1 overflow-y-auto max-h-[var(--available-height)] bg-white border border-gray-200 rounded-md shadow-md">
              {items.map(({ label, value }) => (
                <BaseSelect.Item
                  key={value}
                  value={value}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-800 rounded cursor-pointer 
                             hover:bg-gray-100 data-[highlighted]:bg-gray-900 data-[highlighted]:text-white"
                >
                  {/* SVG checkmark indicator */}
                  <BaseSelect.ItemIndicator className="w-3 h-3">
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
                  </BaseSelect.ItemIndicator>

                  <BaseSelect.ItemText>{label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
