import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl">Welcome to Curator</h2>
    </div>
  );
}
