interface LogoProps {
  white?: boolean
  className?: string
}

export function Logo({ white = true, className = '' }: LogoProps) {
  const text = white ? '#FFFFFF' : '#0F0F0F'
  const accent = '#F5C518'

  return (
    <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-label="WASH HUB">
      {/* Goccia stilizzata */}
      <path d="M10 28 C10 28 3 21 3 16 C3 11.5 6.5 8 10 8 C13.5 8 17 11.5 17 16 C17 21 10 28 10 28Z"
        fill={accent} />
      <path d="M10 22 C10 22 6.5 18.5 6.5 16 C6.5 13.8 8.1 12 10 12 C11.9 12 13.5 13.8 13.5 16 C13.5 18.5 10 22 10 22Z"
        fill={white ? '#0F0F0F' : '#FFFFFF'} opacity="0.3" />
      {/* WASH */}
      <text x="22" y="26" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18"
        letterSpacing="-0.5" fill={text}>WASH</text>
      {/* HUB */}
      <text x="88" y="26" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18"
        letterSpacing="-0.5" fill={accent}>HUB</text>
    </svg>
  )
}
