import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize';
import { cn } from '../utils/cn.js';

function Textarea({ className, ...props }: TextareaAutosizeProps) {
  return (
    <TextareaAutosize
      className={cn(
        'm-0 w-full resize-none bg-transparent p-0 placeholder:text-grey-medium rounded-md focus:outline-none mb-[-6.5px] text-[19px]/[22px] md:text-[18px]/[21px] tracking-[-0.35px]',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
