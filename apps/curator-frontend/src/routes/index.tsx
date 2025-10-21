import { useGeoAccount } from '@geo/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { EditProfile } from '@/components/edit-profile';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const geoAccount = useGeoAccount();

  if (geoAccount.status === 'loading') {
    return <div>Loading…</div>;
  }

  if (geoAccount.status === 'signed-out') {
    return <div>Sign in to get started</div>;
  }

  if (geoAccount.status === 'signed-in') {
    if (geoAccount.onboardingStep === 'edit-profile') {
      return (
        <EditProfile
          onSubmit={({ name, githubUrl, xUrl, linkedinUrl }) => {
            geoAccount.createAccount({ name, githubUrl, xUrl, linkedinUrl });
          }}
        />
      );
    }

    if (geoAccount.onboardingStep === 'create-account-space') {
      return <div>Creating account space…</div>;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl">Welcome {geoAccount.profile?.name}</h2>
      </div>
    );
  }

  return null;
}
