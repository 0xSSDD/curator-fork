import { cn, Dialog, Dots } from '@geo/design-system';

export type DialogCreateSpaceState = 'creating-space' | 'finalizing' | 'closed';

export const Animation = ({ active = false }) => {
  return (
    <article
      className="bg-gradient-geo relative flex h-[272px] w-[328px] items-center justify-center overflow-clip rounded"
      aria-hidden="true"
    >
      <div className="absolute -left-5 top-3">
        <div
          className={cn('transition duration-300', active ? 'translate-x-2 translate-y-2 opacity-50' : 'opacity-20')}
        >
          <img src="/images/onboarding/top-left.png" alt="" className="w-1/2" />
        </div>
      </div>
      <div className="absolute -right-20 -top-6">
        <div
          className={cn('transition duration-300', active ? '-translate-x-2 translate-y-2 opacity-50' : 'opacity-20')}
        >
          <img src="/images/onboarding/top-right.png" alt="" className="w-1/2" />
        </div>
      </div>
      <div className="absolute -right-16 bottom-0 top-0 flex items-center">
        <div className={cn('transition duration-300', active ? '-translate-x-2 opacity-50' : 'opacity-20')}>
          <img src="/images/onboarding/right-middle.png" alt="" className="w-1/2" />
        </div>
      </div>
      <div className="absolute -bottom-8 -right-48">
        <div
          className={cn('transition duration-300', active ? '-translate-x-2 -translate-y-2 opacity-50' : 'opacity-20')}
        >
          <img src="/images/onboarding/right-bottom.png" alt="" className="w-1/2" />
        </div>
      </div>
      <div className="absolute -bottom-4 -left-4">
        <div
          className={cn('transition duration-300', active ? '-translate-y-2 translate-x-2 opacity-50' : 'opacity-20')}
        >
          <img src="/images/onboarding/left-bottom.png" alt="" className="w-1/2" />
        </div>
      </div>
      <div className="relative -mb-6">
        <img src="/images/onboarding/main.png" alt="" className="h-auto w-[246px]" />
      </div>
      <div className="absolute bottom-8 left-3">
        <div className={cn('transition duration-300', active ? '-translate-y-2 opacity-100' : 'opacity-0')}>
          <img src="/images/onboarding/left-middle-float.png" alt="" className="w-1/2" />
        </div>
      </div>
      <div className="absolute -right-16 top-12">
        <div className={cn('transition duration-300', active ? 'translate-y-2 opacity-100' : 'opacity-0')}>
          <img src="/images/onboarding/right-middle-float.png" alt="" className="w-1/2" />
        </div>
      </div>
    </article>
  );
};

export const DialogCreateSpace = ({ state }: { state: DialogCreateSpaceState }) => {
  return (
    <Dialog.Root open={state === 'creating-space' || state === 'finalizing'}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup className="focus:outline-none">
          <div className="pointer-events-auto relative z-100 h-[440px] w-full max-w-[360px] overflow-hidden p-4">
            <div className="space-y-4">
              <div className="relative flex grow flex-col">
                <div className="flex w-full flex-col items-center pt-3">
                  <h3 className="mx-auto text-center">
                    {state === 'finalizing' ? 'Finalizing details…' : 'Creating your space…'}
                  </h3>
                  <p className="mx-auto mt-2 px-4 text-center">
                    You’re almost ready to start earning points from bounties and projects.
                  </p>
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-4">
                <div className="absolute left-0 right-0 top-0 z-10 flex -translate-y-1/2 justify-center">
                  <div className="flex size-11 items-center justify-center rounded-full bg-white shadow-[0px_4px_39px_0px_#0000001F]">
                    <Dots />
                  </div>
                </div>
                <div className="relative z-0">
                  <Animation active={state === 'finalizing'} />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
