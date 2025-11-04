import { Field as BaseField } from '@base-ui-components/react/field';
import { cn } from '../utils/cn.js';

function Label({ className, ...props }: BaseField.Label.Props) {
  return (
    <BaseField.Label
      className={cn('text-[19px]/[22px] md:text-[17px]/[20px] tracking-[-0.35px] font-semibold', className)}
      {...props}
    />
  );
}

const Field = {
  Label,
  Root: BaseField.Root,
  Control: BaseField.Control,
  Error: BaseField.Error,
  Validity: BaseField.Validity,
};

export { Field };
