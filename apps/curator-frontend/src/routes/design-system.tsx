import { FetchHttpClient } from '@effect/platform';
import { Button, Dialog, Divider, Field, Input, Textarea } from '@geo/design-system';
import { ContentIds } from '@graphprotocol/grc-20';
import { createFileRoute } from '@tanstack/react-router';
import { Effect } from 'effect';
import { useState } from 'react';
import { DialogCreateSpace, type DialogCreateSpaceState } from '@/components/dialog-create-space';
import { EntityInput } from '@/components/entity-input';
import { ApiClient } from '../utils/api-client';

export const Route = createFileRoute('/design-system')({
  component: RouteComponent,
});

const colors = [
  { name: 'CTA', class: 'bg-cta', var: '--color-cta' },
  { name: 'CTA Hover', class: 'bg-cta-hover', var: '--color-cta-hover' },
  { name: 'CTA Active', class: 'bg-cta-active', var: '--color-cta-active' },
  {
    name: 'CTA Outline',
    class: 'bg-cta-outline',
    var: '--color-cta-outline',
  },
  { name: 'Disabled', class: 'bg-disabled', var: '--color-disabled' },
  { name: 'Background', class: 'bg-background', var: '--color-background' },
  {
    name: 'Primary Dark',
    class: 'bg-primary-dark',
    var: '--color-primary-dark',
  },
  {
    name: 'Primary Purple',
    class: 'bg-primary-purple',
    var: '--color-primary-purple',
  },
  {
    name: 'Primary Pink',
    class: 'bg-primary-pink',
    var: '--color-primary-pink',
  },
  { name: 'Divider', class: 'bg-divider', var: '--color-divider' },
  { name: 'Grey Light', class: 'bg-grey-light', var: '--color-grey-light' },
  {
    name: 'Grey Medium',
    class: 'bg-grey-medium',
    var: '--color-grey-medium',
  },
  {
    name: 'Grey Light Text',
    class: 'bg-grey-light-text',
    var: '--color-grey-light-text',
  },
  { name: 'Dark Text', class: 'bg-dark-text', var: '--color-dark-text' },
  {
    name: 'Accent Error',
    class: 'bg-accent-error',
    var: '--color-accent-error',
  },
  {
    name: 'Accent Success',
    class: 'bg-accent-success',
    var: '--color-accent-success',
  },
  {
    name: 'Accent Purple BG',
    class: 'bg-accent-purple-bg',
    var: '--color-accent-purple-bg',
  },
  {
    name: 'Accent Purple BG Light',
    class: 'bg-accent-purple-bg-light',
    var: '--color-accent-purple-bg-light',
  },
  {
    name: 'Accent Pink BG',
    class: 'bg-accent-pink-bg',
    var: '--color-accent-pink-bg',
  },
  {
    name: 'Accent Blue Grey BG',
    class: 'bg-accent-blue-grey-bg',
    var: '--color-accent-blue-grey-bg',
  },
];

const querySkills = async (query: string) => {
  const getSkills = Effect.gen(function* () {
    const apiClient = yield* ApiClient;
    const skills = yield* apiClient.Profile.getProfileSkills({ urlParams: { query } });
    return skills;
  }).pipe(Effect.provide(FetchHttpClient.layer));
  const result = await Effect.runPromise(getSkills);
  return result.skills;
};

function RouteComponent() {
  const [dialogCreateSpaceState, setDialogCreateSpaceState] = useState<DialogCreateSpaceState>('closed');

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1>Design System</h1>
      </section>

      <section>
        <h2 className="pb-2">Entity Input</h2>
        <EntityInput
          queryEntities={querySkills}
          onChange={(selected) => {
            // eslint-disable-next-line no-console
            console.log('EntityInput selected:', selected);
          }}
          typeIds={[ContentIds.SKILL_TYPE]}
        />
      </section>

      <section>
        <h2 className="pb-2">Primary Button</h2>
        <Button>Sign up</Button>
        <Button disabled>Sign up</Button>
      </section>

      <section>
        <h2 className="pb-2">Secondary Button</h2>
        <Button variant="secondary">Sign up</Button>
        <Button variant="secondary" disabled>
          Sign up
        </Button>
      </section>

      <section>
        <h2 className="pb-2">Field</h2>
        <Field.Root>
          <Field.Label>LinkedIn</Field.Label>
          <Input placeholder="URL …" />
        </Field.Root>
      </section>

      <section>
        <h2 className="pb-2">Input</h2>
        <Input placeholder="URL …" />
      </section>

      <section>
        <h2 className="pb-2">Textarea</h2>
        <Textarea placeholder="Describe what you do…" />
      </section>

      <section>
        <h2 className="pb-2">Divider</h2>
        <Divider />
      </section>

      <section>
        <h2 className="pb-2">Dialog</h2>
        <Dialog.Root>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup className="p-4">
              <div>Content goes here</div>
              <Dialog.Close>
                <Button variant="secondary">Close</Button>
              </Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </section>

      <section>
        <h2 className="pb-2">Dialog Create Space</h2>
        <DialogCreateSpace state={dialogCreateSpaceState} />
        <Button
          onClick={() => {
            setDialogCreateSpaceState('creating-space');
            setTimeout(() => {
              setDialogCreateSpaceState('finalizing');
              setTimeout(() => {
                setDialogCreateSpaceState('closed');
              }, 3000);
            }, 3000);
          }}
        >
          Open Dialog for 6 Seconds
        </Button>
      </section>

      <section>
        <h2 className="pb-2">Colors</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {colors.map((color) => (
            <div key={color.var}>
              <div className={`${color.class} h-12 rounded border border-grey-light`} />
              <p className="text-xs!">
                <strong>{color.name}</strong>
              </p>
              <p className="text-xs!">
                <code>{color.class}</code>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="pb-2">Typography</h2>
        <div>
          <div className="main-title">Main Title</div>
          <div className="large-title">Large Title</div>
          <div className="medium-title">Medium Title</div>
          <div className="small-title">Small Title</div>
          <div className="tiny-title">Tiny Title</div>
          <div className="meta-title">Meta Title</div>
          <div className="body-copy">Body Copy — Regular</div>
          <div className="body-copy bold">Body Copy — Bold</div>
          <div className="tag-text">Tag / Button Copy</div>
          <div className="tab-copy">Tab Copy</div>
          <div className="nav-link">Navigation Link</div>
          <div className="large-button">Large Button</div>
        </div>
      </section>
    </div>
  );
}
