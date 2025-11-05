import { createFileRoute } from '@tanstack/react-router';
import { EditProfile } from '@/components/edit-profile';
import MyBountiesHeader from '@/components/my-bounties-header';
import OnBoardingDashboard from '@/components/onboarding-dashboard';

export const Route = createFileRoute('/components')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <article className="flex flex-col gap-8">
      <h1>Component test page</h1>
      <section>
        <OnBoardingDashboard />
      </section>
      <section>
        <MyBountiesHeader />
      </section>
      <section className="box">
        <EditProfile
          onSubmit={(data) => {
            console.log('Form submitted:', data);
          }}
        />
      </section>
    </article>
  );
}
