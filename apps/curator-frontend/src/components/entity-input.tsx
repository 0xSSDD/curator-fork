import { Combobox as BaseCombobox } from '@base-ui-components/react/combobox';
import { Button, Divider } from '@geo/design-system';
import { Graph, type Id, IdUtils, type Op } from '@graphprotocol/grc-20';
import React from 'react';

export type EntityItem = {
  readonly id: string;
  readonly name: string;
  readonly ops?: readonly Op[];
};

type EntityInputProps = {
  queryEntities: (query: string) => Promise<readonly EntityItem[]>;
  onChange?: (selected: EntityItem[]) => void;
  typeIds: readonly Id[];
};

const placeholder = 'Find or create …';

export function EntityInput({ queryEntities, onChange, typeIds }: EntityInputProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const id = React.useId();
  const [query, setQuery] = React.useState('');
  const [items, setItems] = React.useState<readonly EntityItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState<EntityItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const filteredItems = React.useMemo(
    () => items.filter((item) => !selected.some((s) => s.id === item.id)),
    [items, selected],
  );

  React.useEffect(() => {
    let isCurrent = true;
    if (query.length === 0) {
      setItems([]);
      setLoading(false);
      return () => {
        isCurrent = false;
      };
    }
    setLoading(true);
    queryEntities(query)
      .then((results) => {
        if (!isCurrent) return;
        setItems(results);
        setLoading(false);
      })
      .catch((error) => {
        if (!isCurrent) return;
        setLoading(false);
        // TODO show a error tooltip to the user
        console.error('Failed to fetch entities:', error);
      });
    return () => {
      isCurrent = false;
    };
  }, [query, queryEntities]);

  return (
    <BaseCombobox.Root
      items={filteredItems}
      multiple
      value={selected}
      open={open}
      onOpenChange={(nextOpen) => {
        if (selected.length === 0) {
          setOpen(nextOpen && query.length > 0);
        } else {
          setOpen(nextOpen);
        }
      }}
      onValueChange={(value) => {
        setSelected(value);
        onChange?.(value);
        setOpen(false);
      }}
    >
      <div className="flex flex-col gap-2">
        {selected.length === 0 && (
          <BaseCombobox.Input
            id={id}
            placeholder={placeholder}
            className="m-0 w-full bg-transparent p-0 placeholder:text-grey-medium rounded-md focus:outline-none text-[19px]/[22px] md:text-[18px]/[21px] tracking-[-0.35px]"
            onChange={(e) => {
              const next = e.target.value;
              setQuery(next);
              setOpen(next.length > 0);
            }}
          />
        )}

        <BaseCombobox.Chips
          className="flex flex-wrap items-center gap-2"
          ref={containerRef}
          aria-label="Selected entities"
        >
          <BaseCombobox.Value>
            {(value: EntityItem[]) => (
              <>
                {value.map((entity) => (
                  <BaseCombobox.Chip
                    key={entity.id}
                    className="flex items-center rounded-md bg-white border border-grey-light pl-1.5 outline-none cursor-default"
                    aria-label={entity.name}
                  >
                    {entity.name}
                    <BaseCombobox.ChipRemove
                      className="button-text tracking-[-0.35px] pb-px rounded-md text-m font-regular leading-[13px] focus-visible:ring-2 focus:outline-none bg-white text-grey-light hover:text-dark-text px-[5px] focus-visible:ring-cta-outline disabled:text-grey-light-text box-border pt-0.5"
                      aria-label="Remove"
                    >
                      <XIcon />
                    </BaseCombobox.ChipRemove>
                  </BaseCombobox.Chip>
                ))}
              </>
            )}
          </BaseCombobox.Value>
          {selected.length > 0 && (
            <BaseCombobox.Trigger
              className="button-text tracking-[-0.35px] pb-px rounded-md text-m font-regular leading-[13px] h-[24px] disabled:cursor-not-allowed disabled:bg-disabled focus:outline-none bg-white text-dark-text px-[5px] border border-grey-light hover:border-dark-text active:border-dark-text focus-visible:outline-none box-border"
              aria-label="Add new"
              onClick={() => setQuery('')}
            >
              <PlusIcon />
            </BaseCombobox.Trigger>
          )}
        </BaseCombobox.Chips>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="z-50 outline-none" align="start" sideOffset={8} anchor={containerRef}>
          <BaseCombobox.Popup className="w-var(--anchor-width) max-h-[min(var(--available-height),23rem)] max-w-var(--available-width) origin-var(--transform-origin) overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md bg-white text-gray-900 shadow-lg  outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 min-w-72">
            <div className="p-1">
              {selected.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 border border-divider rounded-md h-9">
                    <div className="pl-3">
                      <SearchIcon />
                    </div>
                    <BaseCombobox.Input
                      id={id}
                      placeholder={placeholder}
                      className="m-0 w-full bg-transparent p-0 placeholder:text-grey-medium focus:outline-none text-[19px]/[22px] md:text-[18px]/[21px] tracking-[-0.35px]"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {query.length > 0 && (
                <>
                  <BaseCombobox.Empty className="p-2 empty:p-0">
                    {loading ? 'Loading…' : 'No Results'}
                  </BaseCombobox.Empty>
                  <BaseCombobox.List>
                    {(language: EntityItem) => (
                      <BaseCombobox.Item
                        key={language.id}
                        className="cursor-default items-center outline-none select-none rounded-md px-3 py-2.5 [@media(hover:hover)]:data-highlighted:bg-accent-blue-grey-bg"
                        value={language}
                      >
                        <div>{language.name}</div>
                      </BaseCombobox.Item>
                    )}
                  </BaseCombobox.List>
                </>
              )}
            </div>
            {query.length > 0 && (
              <>
                <Divider />
                <div className="flex justify-end p-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const id = IdUtils.generate();
                      const name = query;
                      setQuery('');
                      setOpen(false);
                      const { ops: createEntityOps } = Graph.createEntity({ id, name, types: [...typeIds] });
                      const entityWithOps: EntityItem = { id, name, ops: createEntityOps };
                      setSelected((prev) => {
                        const next = [...prev, entityWithOps];
                        onChange?.(next);
                        return next;
                      });
                    }}
                  >
                    Create new
                  </Button>
                </div>
              </>
            )}
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}

function XIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SearchIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect x="0.5" y="0.5" width="12" height="12" rx="6" stroke="currentColor" />
      <path d="M15.33 15.33L11 11" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 0V16" stroke="currentColor" />
      <path d="M0 8L16 8" stroke="currentColor" />
    </svg>
  );
}
