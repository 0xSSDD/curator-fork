import { Button } from '@geo/design-system';
import { createFileRoute } from '@tanstack/react-router';

function Login() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 p-8 text-center">
        <Button
          onClick={() => {
            alert('Not implemented');
          }}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/login')({
  component: Login,
});
