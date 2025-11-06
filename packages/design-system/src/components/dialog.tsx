import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { cn } from '../utils/cn.js';

function Backdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  return (
    <BaseDialog.Backdrop
      className={cn(
        'fixed inset-0 min-h-dvh bg-dark-text opacity-40 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute z-60',
        className,
      )}
      {...props}
    />
  );
}

function Popup({ className, ...props }: BaseDialog.Popup.Props) {
  return (
    <BaseDialog.Popup
      className={cn(
        'fixed top-1/2 left-1/2 -mt-8 w-90 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 z-70',
        className,
      )}
      {...props}
    />
  );
}

const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Portal: BaseDialog.Portal,
  Popup,
  Backdrop,
  Title: BaseDialog.Title,
  Description: BaseDialog.Description,
  Close: BaseDialog.Close,
};

export { Dialog };
