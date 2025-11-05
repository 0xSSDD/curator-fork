export default function TitleWithSubtitle({
  title = 'My bounties',
  subtitle = 'Bounties are space tasks like adding, editing, or fixing data. Unlock bounties by joining a space.',
  children,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 w-full max-w-[42rem]" style={{ flexGrow: 0, flexShrink: 0 }}>
      {/* Title */}
      <h2 className="w-full max-w-[40rem] medium-title flex items-center text-dark-text" style={{ flexGrow: 0 }}>
        {title}
      </h2>

      {/* Custom content (optional) */}
      {children && <div className="w-full">{children}</div>}

      {/* Subtitle */}
      {subtitle && (
        <p className="w-full flex items-center body-copy text-dark-text" style={{ flexGrow: 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
