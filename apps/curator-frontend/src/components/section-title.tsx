interface SectionTitleProps {
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export default function SectionTitle({ icon, content }: SectionTitleProps) {
  return (
    <div
      className=" 
        flex flex-row items-center
        gap-[12px] 
        main-title
        text-dark-text
      "
    >
      {icon}
      {content}
    </div>
  );
}
