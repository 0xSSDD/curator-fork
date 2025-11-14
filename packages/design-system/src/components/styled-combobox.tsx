import { Combobox as BaseCombobox } from '@base-ui-components/react/combobox';
import React from 'react';
import { OverlapImages } from './overlap-images.js';

export interface StyledComboboxItem {
  label: string;
  value: string;
  image: string;
  isSelected: boolean;
  isAllOption: boolean;
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
  const [selectedItems, setSelectedItems] = React.useState<StyledComboboxItem[]>(items.filter((i) => i.isSelected));
  const defaultValues = items.filter((i) => i.isSelected);

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

  const onValueChange = (
    value: StyledComboboxItem | StyledComboboxItem[],
    eventDetails: BaseCombobox.Root.ChangeEventDetails,
  ) => {
    console.log('onValueChange', value, eventDetails);

    let normalized: StyledComboboxItem[] = [];

    if (multiple && Array.isArray(value)) {
      const allOption = items.find((i) => i.isAllOption);

      if (allOption) {
        const hasAll = value.some((v) => v.value === allOption.value);
        const allIsLast = value?.[value.length - 1]?.value === allOption.value;

        if (hasAll && allIsLast) {
          console.log("✅ 'All' is last and selected — keeping only 'All'");
          normalized = [allOption];
        } else {
          normalized = value.filter((v) => v.value !== allOption.value);

          const allExceptAll = items.filter((i) => i.value !== allOption.value);
          if (normalized.length === allExceptAll.length) {
            console.log("✅ All items (except 'All') selected — replacing with 'All'");
            normalized = [allOption];
          }
        }
      } else {
        normalized = value;
      }

      // 🔄 Update each item's isSelected flag
      items.forEach((item) => {
        item.isSelected = normalized.some((selected) => selected.value === item.value);
      });

      setSelectedItems(normalized);
    } else if (!multiple && value) {
      normalized = [value as StyledComboboxItem];

      // 🔄 Update single selection
      items.forEach((item) => {
        item.isSelected = item.value === (value as StyledComboboxItem).value;
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
    <BaseCombobox.Root
      id={rootId}
      multiple={multiple}
      defaultValue={multiple ? defaultValues : defaultValues[0]}
      items={items}
      itemToStringLabel={itemToStringLabel}
      filter={customFilter}
      onValueChange={onValueChange}
      value={multiple ? selectedItems : selectedItems[0] || undefined}
    >
      {/* Trigger Button */}
      <BaseCombobox.Trigger
        className="custom-dropdown flex flex-row items-center justify-between gap-6 px-[6px] pb-[1px]
          w-auto min-w-[80px] max-w-full h-[24px] border border-grey-light rounded-[6px] bg-white"
      >
        <div className="flex flex-row gap-2">
          {selectedItems.length > 0 && !selectedItems.some((c) => c.isAllOption) && (
            <OverlapImages images={selectedItems.map((c) => c.image)} />
          )}

          {getSelectedSummary(selectedItems) && <span className="tag-text">{getSelectedSummary(selectedItems)}</span>}
        </div>

        <BaseCombobox.Icon className={'down-arrow-icon'}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>down arrow</title>
            <path d="M0.75 4.25L6 9.5L11.25 4.25" stroke="currentColor" stroke-linecap="round" />
          </svg>
        </BaseCombobox.Icon>
        <BaseCombobox.Icon className={'up-arrow-icon'}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>up arrow</title>
            <path d="M11.25 8.75L6 3.5L0.75 8.75" stroke="currentColor" stroke-linecap="round" />
          </svg>
        </BaseCombobox.Icon>
      </BaseCombobox.Trigger>

      {/* Popup / Dropdown */}
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner align="start" className="outline-none" sideOffset={4}>
          <BaseCombobox.Popup
            className="box-border flex flex-col items-start p-1 gap-1 
              w-full max-h-[200px] bg-white border border-grey-light 
              shadow-[0_4px_25px_rgba(0,0,0,0.25)] rounded-[12px]"
          >
            {/* Search box */}
            {searchable && (
              <div
                className="flex flex-row items-center gap-2 px-3 py-2.5 h-9 
                bg-white border border-divider rounded-[8px]"
              >
                <SearchIcon className="w-4 h-4 text-grey-light-text" />

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
                  className={`flex flex-row items-center justify-between px-3 py-2.5 w-[209px] h-9 rounded-[8px]  hover:bg-accent-blue-grey-hover
                    ${selectedItems.find((i) => i.value === item.value) ? 'bg-accent-blue-grey-bg' : ' bg-white'} 
                    transition-colors duration-150`}
                >
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex items-center justify-center w-4 h-4 rounded-[4px] overflow-hidden">
                      <img src={item.image} alt={item.label} className="w-4 h-4 object-cover rounded-[4px]" />
                    </div>
                    <span className="button-text text-dark-text">{item.label}</span>
                  </div>
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
