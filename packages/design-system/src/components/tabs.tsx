import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import type React from 'react';

interface TabItem {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  panels: Record<string, React.ReactNode>;
  defaultValue?: string;
}

export function Tabs({ tabs, panels, defaultValue }: TabsProps) {
  return (
    <BaseTabs.Root defaultValue={defaultValue ?? tabs[0]?.value ?? ''}>
      <BaseTabs.List className="relative z-0 flex gap-1 px-1 shadow-[inset_0_-1px] shadow-gray-200">
        {tabs.map(({ value, label }) => (
          <BaseTabs.Tab
            key={value}
            className={`
              flex h-8 items-center justify-center border-0 px-2 break-keep whitespace-nowrap  
              tiny-title text-grey-light-text outline-none select-none 
              data-[selected]:pb-1
              data-[selected]:border-b-2
              data-[selected]:border-dark-text
              data-[selected]:text-dark-text
              hover:pb-1
              hover:border-b-2
              hover:border-dark-text
              hover:text-dark-text
            `}
            value={value}
          >
            {label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>

      {tabs.map(({ value }) => (
        <BaseTabs.Panel
          key={value}
          className="
            relative flex h-32 items-center justify-center
            -outline-offset-1 outline-blue-800
            focus-visible:rounded-md focus-visible:outline focus-visible:outline-2
          "
          value={value}
        >
          <div>{panels[value]}</div>
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
