"use client";

interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function AmenitiesIcon({ size = 26, strokeWidth = 1.2, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2h8" />
      <path d="M9 2v5.5a2 2 0 0 1-.59 1.42L12 12l2.5-3.3a2 2 0 0 1 .5-1.2V2" />
      <path d="M12 12v9" />
      <path d="M7 21h10" />
    </svg>
  );
}
