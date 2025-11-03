import { Button } from '@geo/design-system';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/design-system')({
  component: RouteComponent,
});

function RouteComponent() {
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

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1>Design System</h1>
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
        <h2 className="pb-2">Colors</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {colors.map((color) => (
            <div key={color.var}>
              <div className={`${color.class} h-12 rounded border border-grey-light`} />
              <p className="!text-xs">
                <strong>{color.name}</strong>
              </p>
              <p className="!text-xs">
                <code>{color.class}</code>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
