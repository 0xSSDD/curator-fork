import { Input as BaseInput } from '@base-ui-components/react/input';
import { cn } from '../utils/cn.js';

function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <BaseInput
      className={cn(
        'm-0 w-full bg-transparent p-0 placeholder:text-grey-medium rounded-md focus:outline-none mb-[-6.5px] text-[19px]/[22px] md:text-[18px]/[21px] tracking-[-0.35px]',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
