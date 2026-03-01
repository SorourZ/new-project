/**
 * New official Saudi Riyal symbol (introduced 2023).
 * Rendered as an inline SVG so it displays correctly regardless of font support.
 */
export function SARSymbol({
  size = 14,
  className,
  color = 'currentColor',
}: {
  size?: number
  className?: string
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left vertical stroke */}
      <rect x="10" y="10" width="14" height="65" rx="5" />
      {/* Right vertical stroke */}
      <rect x="38" y="10" width="14" height="65" rx="5" />
      {/* Top horizontal bar (full width) */}
      <rect x="10" y="10" width="80" height="14" rx="5" />
      {/* Middle horizontal bar */}
      <rect x="10" y="34" width="80" height="12" rx="5" />
      {/* Bottom diagonal stroke (right, angled) */}
      <rect
        x="42"
        y="63"
        width="48"
        height="12"
        rx="5"
        transform="rotate(-15 42 63)"
      />
      {/* Second diagonal stroke */}
      <rect
        x="42"
        y="80"
        width="44"
        height="11"
        rx="5"
        transform="rotate(-15 42 80)"
      />
    </svg>
  )
}
