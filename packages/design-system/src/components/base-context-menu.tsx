import { ContextMenu } from '@base-ui-components/react/context-menu';

interface BaseContextMenuProps {
  /** Element that triggers the context menu — e.g. icon, button, etc. */
  children: React.ReactNode;
  /** List of menu items */
  items: { label: string; icon?: React.ReactNode; onClick?: React.MouseEventHandler<HTMLElement> }[];
}

export function BaseContextMenu({ children, items }: BaseContextMenuProps) {
  return (
    <ContextMenu.Root>
      {/* Trigger — this can be any element passed as a child */}
      <ContextMenu.Trigger>
        <div className="inline-flex cursor-pointer select-none">{children}</div>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Positioner className="outline-none">
          <ContextMenu.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[opacity] data-[ending-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            {items.map((item, i) => (
              <ContextMenu.Item
                key={`ci_${i + 1}`}
                className="  px-3 py-2   w-[167px] h-[36px]    bg-white  rounded-lg   text-dark-text                        
                cursor-default   outline-none select-none  button-text
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
              </ContextMenu.Item>
            ))}
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
