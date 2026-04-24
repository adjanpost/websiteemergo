import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowRight({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function Menu({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export function X({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function Mail({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <rect width="20" height="16" x="2" y="4" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function Phone({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.57 4.9 2 2 0 0 1 3.54 2.69l3.18-.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
    </svg>
  );
}

export function MapPin({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Check({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Loader2({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function CheckCircle2({ className, ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
