import clsx from 'clsx';

export const Button = ({
  variant,
  className,
  ...props
}: {
  variant?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const chosenVariant = variant || 'primary';

  const base =
    'button-text tracking-[-0.35px] pb-[1px] rounded-md text-m font-regular leading-[13px] h-[24px] disabled:cursor-not-allowed disabled:bg-disabled focus-visible:ring-2 focus:outline-none';
  const variants = {
    primary:
      'bg-cta text-white px-1.5 hover:bg-cta-hover active:bg-cta-active focus-visible:ring-cta-outline disabled:text-grey-light-text',
    secondary:
      'bg-white text-dark-text px-[5px] border border-grey-light hover:border-dark-text active:border-dark-text focus-visible:ring-cta-outline disabled:hover:border-disabled disabled:active:border-disabled disabled:text-grey-light-text  box-border',
  };

  return <button type="button" className={clsx(base, variants[chosenVariant], className)} {...props} />;
};
