import { Popover } from '@base-ui-components/react/popover';
import { cn } from '../utils/cn.js';
import { Divider } from './divider.js';

interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface ActionPopoverProps {
  trigger?: React.ReactNode;
  items: ActionItem[];
  title?: ActionItem | undefined;
  className?: string;
}

export function ActionPopover({ trigger, items, title, className }: ActionPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className={cn('inline-flex cursor-pointer select-none', className)}>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="box-border py-1 bg-white border border-grey-light shadow-[0_4px_25px_rgba(0,0,0,0.25)] rounded-[12px]">
            {title && (
              <div>
                <Popover.Title
                  className="px-3 py-1 bg-white rounded-lg text-dark-text  
                  cursor-default outline-none select-none button-text
                  data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 
                  data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 
                  data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] 
                  data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
                >
                  <button type="button" key="action_title" onClick={title.onClick}>
                    {title.label}
                  </button>
                </Popover.Title>
                <Divider />
              </div>
            )}

            <div className="flex flex-col">
              {items.map((item, i) => (
                <button
                  type="button"
                  key={`action_${i + 1}`}
                  onClick={item.onClick}
                  className="cursor-pointer px-3 py-2 w-[167px] h-[36px] bg-white rounded-lg text-dark-text  
                   outline-none select-none button-text
                  data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 
                  data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 
                  data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] 
                  data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
                >
                  <div className="flex flex-row  justify-between  items-center gap-5">
                    <div>
                      <span> {item.label}</span>
                    </div>
                    {item.icon && (
                      <div>
                        <span className="flex w-4 h-4">{item.icon}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
