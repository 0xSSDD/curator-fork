import clsx from 'clsx';

type Variant = 'points' | 'bounty-dark' | 'active' | 'profile-points' | 'dark-icon' | 'mid-icon' | 'skill' | 'going';

interface TagProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: Variant;
  icon?: React.ReactNode;
  text?: string;
}

export const Tag = ({ variant = 'points', icon, text, className, ...rest }: TagProps) => {
  const baseStyles = 'flex flex-row items-center gap-[6px] px-[6px] h-6 w-fit text-sm leading-none flex-shrink-0';

  const variants: Record<Variant, string> = {
    points: 'bg-[var(--color-accent-purple-bg)] text-[var(--color-primary-accent-purple)] rounded-[6px]',
    'bounty-dark': 'bg-[var(--color-primary-accent-purple)] text-[var(--color-secondary-white)] rounded-[6px]',
    active: 'bg-[var(--color-accent-success)] text-[var(--color-primary-text-dark)] rounded-[6px]',
    'profile-points': 'bg-[var(--color-accent-blue-grey-bg)] text-[var(--color-primary-text-dark)] rounded-full',
    'dark-icon': 'bg-[var(--color-primary-text-dark)] text-[var(--color-secondary-white)] rounded-[6px]',
    'mid-icon': 'bg-[var(--color-accent-blue-grey-bg)] text-[var(--color-primary-text-dark)] rounded-[6px]',
    going: 'bg-accent-blue-grey-bg meta-title rounded-[34px] gap-[10px] px-[6px] h-[13px] w-[42px]',
    skill:
      'bg-[var(--color-secondary-white)] border border-[var(--color-secondary-medium-grey)] text-[var(--color-primary-text-dark)] rounded-[6px]',
  };

  return (
    <div className={clsx(baseStyles, variants[variant], className)} {...rest}>
      {/* For all except 'skill', show icon before text */}
      {variant !== 'skill' && icon && <span className="w-3 h-3 flex-none">{icon}</span>}

      {text && <span className="flex items-center">{text}</span>}

      {/* For 'skill', show icon after text */}
      {variant === 'skill' && icon && <span className="w-3 h-3 flex-none">{icon}</span>}
    </div>
  );
};
