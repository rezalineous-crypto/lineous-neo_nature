type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        mx-auto
        max-w-[1440px]
        px-6
        md:px-12
        lg:px-10
        ${className}
      `}
    >
      {children}
    </div>
  );
}
