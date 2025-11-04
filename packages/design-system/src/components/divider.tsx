import { cn } from '../utils/cn.js';

function Divider({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('bg-divider shrink-0 h-px w-full inset-0 top-1/2', className)} {...props} />;
}

export { Divider };
