import { useGeoAccount } from '@geo/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { DialogCreateSpace } from '@/components/dialog-create-space';
import { EditProfile } from '@/components/edit-profile';
import { Logout } from '@/components/logout';
import OnBoardingDashboard from '@/components/onboarding-dashboard';
import { network } from '@/config';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const geoAccount = useGeoAccount();

  if (geoAccount.status === 'loading') {
    return <div>Loading…</div>;
  }

  if (geoAccount.status === 'signed-out') {
    return <div className="text-primary-pink bg-accent-purple-bg p-4 ">Sign in to get started</div>;
  }

  if (geoAccount.status === 'signed-in') {
    if (
      geoAccount.onboardingStep === 'edit-profile' ||
      geoAccount.onboardingStep === 'create-account-space' ||
      geoAccount.onboardingStep === 'finalizing-account-space'
    ) {
      return (
        <div className="fixed inset-0 h-screen w-screen overflow-y-auto z-50 bg-background">
          <div className="bg-white w-full flex items-center px-2 py-2 md:px-5 md:py-2 justify-end">
            <Logout />
          </div>

          <div className="max-w-[672px] mx-auto">
            <EditProfile
              onSubmit={({ name, githubUrl, xUrl, linkedinUrl, avatarData }) => {
                geoAccount.createAccount({ name, githubUrl, xUrl, linkedinUrl, avatarData, network });
              }}
            />
          </div>

          {(geoAccount.onboardingStep === 'create-account-space' ||
            geoAccount.onboardingStep === 'finalizing-account-space') && (
            <DialogCreateSpace
              state={geoAccount.onboardingStep === 'create-account-space' ? 'creating-space' : 'finalizing'}
            />
          )}
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {/* <h2 className="text-2xl">Welcome {geoAccount.profile?.name}</h2> */}
        <OnBoardingDashboard />
      </div>
    );
  }

  return null;
}
