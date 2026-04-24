import { cn } from "@/lib/utils";

interface EmergoLogoProps {
  className?: string;
  /** "light" = white (op donkere achtergrond), "dark" = groen (op lichte achtergrond) */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function EmergoLogo({ className, variant = "dark", size = "md" }: EmergoLogoProps) {
  const color = variant === "light" ? "white" : "#005c2e";
  const sizes = { sm: 100, md: 140, lg: 200 };
  const w = sizes[size];
  const h = Math.round(w * 0.28);
  const stroke = size === "sm" ? 2 : 2.5;
  const bracketSize = h * 0.55;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="EMERGO"
    >
      {/* Left bottom bracket */}
      <polyline
        points={`${bracketSize},${stroke / 2} ${stroke / 2},${stroke / 2} ${stroke / 2},${bracketSize}`}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="square"
      />
      {/* Right top bracket */}
      <polyline
        points={`${w - bracketSize},${h - stroke / 2} ${w - stroke / 2},${h - stroke / 2} ${w - stroke / 2},${h - bracketSize}`}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="square"
      />
      {/* EMERGO text */}
      <text
        x={w / 2}
        y={h / 2 + (size === "sm" ? 4 : size === "md" ? 5 : 7)}
        textAnchor="middle"
        fill={color}
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize={size === "sm" ? 13 : size === "md" ? 18 : 26}
        letterSpacing="0.08em"
      >
        EMERGO
      </text>
    </svg>
  );
}
