import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}
export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger>{children}</BaseTooltip.Trigger>
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner sideOffset={10}>
            <BaseTooltip.Popup
              className="flex flex-row items-center justify-center 
                gap-[10px] px-2 py-1 
                rounded-md bg-dark-text
                text-white meta-title
                shadow-none outline-none
                origin-[var(--transform-origin)]
                transition-[transform,scale,opacity] 
                data-[ending-style]:scale-90 data-[ending-style]:opacity-0 
                data-[instant]:duration-0 
                data-[starting-style]:scale-90 data-[starting-style]:opacity-0
                "
            >
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
