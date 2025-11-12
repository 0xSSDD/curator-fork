import { Select as BaseSelect } from '@base-ui-components/react/select';
import React from 'react';

interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  items: SelectItem[];
  multiple?: boolean;
  defaultValue?: string | string[]; // string for single, string[] for multiple
  onChange?: (value: string | string[] | undefined) => void;
}

export function Select({ items, multiple = false, defaultValue, onChange }: SelectProps) {
  // Internal state for selected value(s)
  const [selectedValue, setSelectedValue] = React.useState<string | string[] | undefined>(() => {
    if (multiple) {
      if (Array.isArray(defaultValue)) return defaultValue;
      return defaultValue ? [defaultValue] : [];
    }
    return typeof defaultValue === 'string' ? defaultValue : undefined;
  });

  // Format selected values as string summary for trigger display
  const getSelectedSummary = () => {
    if (multiple) {
      if (Array.isArray(selectedValue)) {
        if (selectedValue.length === 0) return '---';
        if (selectedValue.length === 1) {
          const item = items.find((i) => i.value === selectedValue[0]);
          return item ? item.label : selectedValue[0];
        }
        if (selectedValue.length <= 3) {
          return `${selectedValue.length} selected`;
        }
        return `+${selectedValue.length} selected`;
      }
      return '---';
    }
    if (typeof selectedValue === 'string') {
      const item = items.find((i) => i.value === selectedValue);
      return item ? item.label : '---';
    }
    return '---';
  };

  return (
    <BaseSelect.Root
      multiple={multiple}
      defaultValue={defaultValue ?? null}
      onValueChange={(value) => {
        setSelectedValue(value);
        if (onChange) onChange(value);
      }}
    >
      <BaseSelect.Trigger
        className="flex flex-row items-center justify-between gap-2 px-[6px] pb-[1px]
          w-auto min-w-[80px] max-w-full h-[24px] border border-grey-light rounded-[6px] bg-white"
      >
        <BaseSelect.Value className="tag-text text-dark-text">{getSelectedSummary()}</BaseSelect.Value>
        <BaseSelect.Icon>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <title>icon</title>
            <path d="M3 5L6 8L9 5" stroke="#606060" strokeWidth="1" />
          </svg>
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      {/* Dropdown list */}
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="outline-none z-10" sideOffset={8} alignItemWithTrigger={false}>
          <BaseSelect.Popup
            className="box-border flex flex-col items-start p-1 gap-1 
              w-full max-h-[200px] bg-white border border-[#DBDBDB] 
              shadow-[0_4px_25px_rgba(0,0,0,0.25)] rounded-[12px]"
          >
            <BaseSelect.List
              className="flex flex-col overflow-y-auto rounded-[8px] gap-1
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              {items.map(({ label, value }) => (
                <BaseSelect.Item
                  key={value}
                  value={value}
                  className={`flex flex-row items-center justify-between px-3 py-2.5 w-full h-9 rounded-[8px] 
                    gap-5
                    transition-colors duration-150`}
                >
                  <BaseSelect.ItemText className="button-text text-dark-text">{label}</BaseSelect.ItemText>

                  <BaseSelect.ItemIndicator className="w-3 h-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <title>check icon</title>
                      <path
                        d="M3 6L5 8L9 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
