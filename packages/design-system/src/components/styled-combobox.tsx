import { Combobox as BaseCombobox } from '@base-ui-components/react/combobox';
import React from 'react';
import { OverlapImages } from './overlap-images.js';

export interface StyledComboboxItem {
  label: string;
  value: string;
  image: string;
  selected: boolean;
}

interface StyledComboboxProps {
  nameOfDropdown: string;
  items: StyledComboboxItem[];
  multiple?: boolean;
  searchable: boolean;
  onChange?: (value: StyledComboboxItem | StyledComboboxItem[] | undefined) => void;
}

export function StyledCombobox({ items, multiple = false, onChange, nameOfDropdown, searchable }: StyledComboboxProps) {
  const id = React.useId();
  const rootId = React.useId();

  // ✅ Maintain internal selection state
  const [selectedItems, setSelectedItems] = React.useState<StyledComboboxItem[]>(items.filter((i) => i.selected));
  const defaultValues = items.filter((i) => i.selected);

  // Utility: convert item to string label
  const itemToStringLabel = (item: StyledComboboxItem) => item.label;

  // Custom filter
  const customFilter = (
    itemValue: StyledComboboxItem,
    query: string,
    itemToStringLabel?: (item: StyledComboboxItem) => string,
  ): boolean => {
    const label = itemToStringLabel ? itemToStringLabel(itemValue) : '';
    return label.toLowerCase().includes(query.toLowerCase());
  };

  // ✅ Generate a compact summary for the trigger
  const getSelectedSummary = (items: StyledComboboxItem[]): string => {
    if (items.length === 0) return '---';
    if (items.length === 1) return items[0].label;
    if (items.length <= 3) return `${items.length} ${nameOfDropdown}s`;
    if (items.length > 3) return `+${items.length - 3} ${nameOfDropdown}s`;
    return '';
  };

  return (
    <BaseCombobox.Root
      id={rootId}
      multiple={multiple}
      defaultValue={multiple ? defaultValues : defaultValues[0]}
      items={items}
      itemToStringLabel={itemToStringLabel}
      filter={customFilter}
      onValueChange={(value, eventDetails) => {
        console.log('onValueChange', value, eventDetails);
        let normalized: StyledComboboxItem[] = [];

        if (multiple && Array.isArray(value)) {
          normalized = value;
          setSelectedItems(normalized);
        } else if (!multiple && value) {
          normalized = [value as StyledComboboxItem];
          setSelectedItems(normalized);
        } else {
          setSelectedItems([]);
        }

        if (onChange) {
          onChange(multiple ? normalized : normalized[0]);
        }
      }}
    >
      {/* Trigger Button */}
      <BaseCombobox.Trigger
        className="flex flex-row items-center justify-between gap-2 px-[6px] pb-[1px]
          w-auto min-w-[80px] max-w-full h-[24px] border border-grey-light rounded-[6px] bg-white"
      >
        {selectedItems.length > 0 && <OverlapImages images={selectedItems.map((c) => c.image)} />}

        {getSelectedSummary(selectedItems) && <span className="tag-text">{getSelectedSummary(selectedItems)}</span>}

        <BaseCombobox.Icon>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <title>icon</title>
            <path d="M3 5L6 8L9 5" stroke="#606060" strokeWidth="1" />
          </svg>
        </BaseCombobox.Icon>
      </BaseCombobox.Trigger>

      {/* Popup / Dropdown */}
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner align="start" className="outline-none" sideOffset={4}>
          <BaseCombobox.Popup
            className="box-border flex flex-col items-start p-1 gap-1 
              w-full max-h-[200px] bg-white border border-[#DBDBDB] 
              shadow-[0_4px_25px_rgba(0,0,0,0.25)] rounded-[12px]"
          >
            {/* Search box */}
            {searchable && (
              <div
                className="flex flex-row items-center gap-2 px-3 py-2.5 h-9 
                bg-white border border-[#EEEEEE] rounded-[8px]"
              >
                <SearchIcon className="w-4 h-4 text-[#606060]" />

                <BaseCombobox.Input
                  id={id}
                  className="flex-1 text-[16px] font-medium text-gray-800 placeholder-gray-400 
                  focus:outline-none bg-transparent"
                />
              </div>
            )}

            {/* Empty State */}
            <BaseCombobox.Empty className="p-4 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
              {`No ${nameOfDropdown}s found`}
            </BaseCombobox.Empty>

            {/* Item List */}
            <BaseCombobox.List
              className="flex flex-col overflow-y-auto rounded-[8px] gap-1
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              {(item: StyledComboboxItem) => (
                <BaseCombobox.Item
                  key={item.value}
                  value={item}
                  aria-label={item.label}
                  className={`flex flex-row items-center justify-between px-3 py-2.5 w-[209px] h-9 rounded-[8px] 
                    ${
                      selectedItems.find((i) => i.value === item.value)
                        ? 'bg-accent-blue-grey-bg'
                        : 'bg-white hover:bg-accent-blue-grey-bg'
                    } 
                    transition-colors duration-150`}
                >
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex items-center justify-center w-4 h-4 rounded-[4px] overflow-hidden">
                      <img src={item.image} alt={item.label} className="w-4 h-4 object-cover rounded-[4px]" />
                    </div>
                    <span className="button-text text-dark-text">{item.label}</span>
                  </div>

                  {/* Checkmark icon when selected */}
                  {selectedItems.find((i) => i.value === item.value) && (
                    <CheckIcon className="w-3 h-3 text-grey-light-text" />
                  )}
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
function SearchIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>search</title>
      <rect x="0.5" y="0.5" width="12" height="12" rx="6" stroke="currentColor" />
      <path d="M15.33 15.33L11 11" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg fill="none" viewBox="0 0 10 10" width="10" height="10" {...props}>
      <title>check</title>
      <path d="M1 5L4 8L9 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
