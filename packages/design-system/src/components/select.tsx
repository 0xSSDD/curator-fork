import { Select as BaseSelect } from '@base-ui-components/react/select';
import React from 'react';

interface SelectItem {
  label: string;
  value: string;
  isAllOption: boolean;
  isSelected: boolean;
}

interface SelectProps {
  items: SelectItem[];
  multiple?: boolean;
  nameOfDropdown: string;
  onChange?: (value: SelectItem | SelectItem[] | undefined) => void;
}

export function Select({ items, multiple = false, nameOfDropdown, onChange }: SelectProps) {
  // Internal state for selected value(s)
  const [selectedItems, setSelectedItems] = React.useState<SelectItem[]>(items.filter((i) => i.isSelected));
  const defaultValues = multiple
    ? items
        .filter((i) => i.isSelected)
        .map((c) => {
          return c.value;
        })
    : items.filter((i) => i.isSelected)?.[0]?.value;

  const getSelectedSummary = (selected: SelectItem[]): string => {
    console.log('getSelectedSummary', selected);
    if (selected.length === 0) return '---';
    if (selected.length === 1) return selected[0].label;
    if (selected.length <= 3) return `${selected.length} ${nameOfDropdown}s`;
    if (selected.length > 3) return `+${selected.length - 3} ${nameOfDropdown}s`;
    return '';
  };
  const onValueChange = (selected: string | string[], eventDetails: BaseSelect.Root.ChangeEventDetails) => {
    console.log('onValueChange', selected, typeof selected, eventDetails);

    let normalized: SelectItem[] = [];

    if (multiple && Array.isArray(selected)) {
      const allOption = items.find((i) => i.isAllOption);

      if (allOption) {
        const hasAll = selected.some((v) => v === allOption.value);
        const allIsLast = selected?.[selected.length - 1] === allOption.value;

        if (hasAll && allIsLast) {
          console.log("✅ 'All' is last and selected — keeping only 'All'");
          normalized = [allOption];
        } else {
          normalized = selected
            .filter((v) => v !== allOption.value)
            .map((val) => items.find((item) => item.value === val))
            .filter((item): item is SelectItem => item !== undefined);

          const allExceptAll = items.filter((i) => i.value !== allOption.value);
          if (normalized.length === allExceptAll.length) {
            console.log("✅ All items (except 'All') selected — replacing with 'All'");
            normalized = [allOption];
          }
        }
      } else {
        normalized = selected
          .map((val) => items.find((item) => item.value === val))
          .filter((item): item is SelectItem => item !== undefined);
      }

      // 🔄 Update each item's isSelected flag
      items.forEach((item) => {
        item.isSelected = normalized.some((selected) => selected.value === item.value);
      });

      setSelectedItems(normalized);
    } else if (!multiple && selected) {
      normalized = [items.find((item) => item.value === selected) as SelectItem];

      // 🔄 Update single selection
      items.forEach((item) => {
        item.isSelected = item.value === selected;
      });

      setSelectedItems(normalized);
    } else {
      // No selection
      items.forEach((item) => {
        item.isSelected = false;
      });
      setSelectedItems([]);
    }

    // Notify parent
    if (onChange) {
      onChange(multiple ? normalized : normalized[0]);
    }
  };
  return (
    <BaseSelect.Root
      multiple={multiple}
      defaultValue={defaultValues ?? null}
      onValueChange={onValueChange}
      value={multiple ? selectedItems.map((c) => c.value) : selectedItems[0]?.value}
    >
      <BaseSelect.Trigger
        className="custom-dropdown flex flex-row items-center justify-between gap-2 px-[6px] pb-[1px]
          w-auto min-w-[80px] max-w-full h-[24px] border border-grey-light rounded-[6px] bg-white"
      >
        {getSelectedSummary(selectedItems) && (
          <BaseSelect.Value className="tag-text text-dark-text">{getSelectedSummary(selectedItems)}</BaseSelect.Value>
        )}

        <BaseSelect.Icon className={'down-arrow-icon'}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>down arrow</title>
            <path d="M0.75 4.25L6 9.5L11.25 4.25" stroke="currentColor" stroke-linecap="round" />
          </svg>
        </BaseSelect.Icon>
        <BaseSelect.Icon className={'up-arrow-icon'}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>up arrow</title>
            <path d="M11.25 8.75L6 3.5L0.75 8.75" stroke="currentColor" stroke-linecap="round" />
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
                     hover:bg-accent-blue-grey-hover
                    ${selectedItems.find((i) => i.value === value) ? 'bg-accent-blue-grey-bg' : ' bg-white'} 
                    transition-colors duration-150`}
                >
                  <BaseSelect.ItemText className="button-text text-dark-text">{label}</BaseSelect.ItemText>

                  {/* <BaseSelect.ItemIndicator className="w-3 h-3">
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
                  </BaseSelect.ItemIndicator> */}
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
