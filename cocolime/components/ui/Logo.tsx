import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

/**
 * CL monogram – used for favicons, small icon contexts, mobile nav icon.
 */
export function LogoCL({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill="#111111" />
      {/* C – top, left, bottom bars */}
      <rect x="9"    y="11"   width="10" height="2.5" rx="1.25" fill="white" />
      <rect x="9"    y="11"   width="2.5" height="18" rx="1.25" fill="white" />
      <rect x="9"    y="26.5" width="10" height="2.5" rx="1.25" fill="white" />
      {/* L – vertical + bottom bar */}
      <rect x="22"   y="11"   width="2.5" height="18" rx="1.25" fill="white" />
      <rect x="22"   y="26.5" width="9"  height="2.5" rx="1.25" fill="white" />
      {/* Lime accent dot */}
      <circle cx="31" cy="11" r="2.8" fill="#9BCE3A" />
    </svg>
  )
}

/**
 * Full "cocolime" wordmark – used in navbar (desktop), footer, auth pages.
 */
export function LogoWordmark({
  className,
  dark = false,
}: {
  className?: string
  dark?: boolean
}) {
  const textColor = dark ? '#ffffff' : '#111111'

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 select-none', className)}
      aria-label="Cocolime"
    >
      {/* Inline CL badge */}
      <LogoCL size={28} />
      {/* Brand name text rendered via CSS font (Playfair Display via globals) */}
      <span
        style={{
          fontFamily: "var(--font-display, 'Playfair Display', Georgia, serif)",
          fontWeight: 500,
          fontSize: 'inherit',
          color: textColor,
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}
      >
        cocolime
      </span>
    </span>
  )
}

/**
 * Linked logo – wraps either variant in a Next.js Link to /.
 */
export function LogoLink({
  variant = 'wordmark',
  size,
  dark,
  className,
}: {
  variant?: 'wordmark' | 'icon'
  size?: number
  dark?: boolean
  className?: string
}) {
  return (
    <Link href="/" aria-label="Cocolime – home" className={cn('flex-shrink-0', className)}>
      {variant === 'icon' ? (
        <LogoCL size={size ?? 36} />
      ) : (
        <LogoWordmark dark={dark} />
      )}
    </Link>
  )
}
