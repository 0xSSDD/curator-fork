import { Button } from '@geo/design-system';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/design-system')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Design System</h1>

      <h2>Primary Button</h2>
      <Button>Sign up</Button>
      <Button disabled>Sign up</Button>

      <h2>Primary Button</h2>
      <Button variant="secondary">Sign up</Button>
      <Button variant="secondary" disabled>
        Sign up
      </Button>
    </div>
  );
}
