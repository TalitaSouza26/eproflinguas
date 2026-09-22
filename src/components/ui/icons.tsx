type IconProps = { className?: string };

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.8c-3.6 0-7.2 1.9-7.2 4.2v1.2a1 1 0 0 0 1 1h12.4a1 1 0 0 0 1-1V18c0-2.3-3.6-4.2-7.2-4.2Z" />
    </svg>
  );
}

export function KeyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M15.5 3a5.5 5.5 0 0 0-5.24 7.18l-6.97 6.97a1 1 0 0 0-.29.7V20a1 1 0 0 0 1 1h2.6a1 1 0 0 0 1-1v-1.3h1.3a1 1 0 0 0 1-1v-1.3h1.3a1 1 0 0 0 .7-.3l1.42-1.41A5.5 5.5 0 1 0 15.5 3Zm1.25 4.75a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 5c-5 0-9.27 3.11-11 7 1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </svg>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M2.1 3.51 3.51 2.1l18.39 18.39-1.41 1.41-3.2-3.2A12.3 12.3 0 0 1 12 19c-5 0-9.27-3.11-11-7a12.4 12.4 0 0 1 4.3-5.18L2.1 3.5Zm6.5 6.5a4.5 4.5 0 0 0 5.89 5.89l-1.6-1.6a2.5 2.5 0 0 1-2.69-2.69l-1.6-1.6ZM12 5c5 0 9.27 3.11 11 7a12.5 12.5 0 0 1-3.06 4.06l-3.2-3.2A4.5 4.5 0 0 0 11.14 7.2L8.9 4.96A12.6 12.6 0 0 1 12 5Z" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function SpinnerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* Ícones de navegação: contorno fino, no padrão do menu do eProf Infantil. */

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M3.5 10.3 12 3.8l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-3.5V15h-7v5.5H5A1.5 1.5 0 0 1 3.5 19v-8.7Z" />
    </svg>
  );
}

export function QuizIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7.5 9h2M7.5 15h2M12.5 9h4M12.5 15h4" />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.5V7a3 3 0 0 0 3 3M17 5.5h2.5V7a3 3 0 0 1-3 3" />
      <path d="M12 14v3.5M8.5 20.5h7M10 17.5h4v3h-4z" />
    </svg>
  );
}

export function HelpIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .9-1 1.6v.3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M14.5 4.5h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3" />
      <path d="M10 8.5 6.5 12 10 15.5M6.5 12H15" />
    </svg>
  );
}

/* Ícones da tela inicial. */

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="m6.5 9.5 5.5 5 5.5-5" />
    </svg>
  );
}

export function CapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 3.6 1.8 8.2 12 12.8l8-3.6v4.9h1.7V8.2L12 3.6Z" />
      <path d="M5.6 11.4v3.9c0 1.9 2.9 3.4 6.4 3.4s6.4-1.5 6.4-3.4v-3.9L12 14.5l-6.4-3.1Z" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M13.5 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5l-5-5Z" />
      <path d="M13.5 3.5v5h5M8.5 13h7M8.5 16.5h4.5" />
    </svg>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M12 3.5s4.8 3.6 4.8 8.2a4.8 4.8 0 0 1-9.6 0c0-1.5.6-2.7 1.3-3.6.3 1 1 1.8 1.8 1.8 1 0 1.7-.9 1.7-2.4 0-1.6-.7-2.9 0-4Z" />
    </svg>
  );
}

export function TrendUpIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M4 16.5 9.5 11l3.5 3.5L20 7.5" />
      <path d="M15.5 7.5H20V12" />
    </svg>
  );
}

export function ChartIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M5 19.5V13M12 19.5V6M19 19.5v-8" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M4 5.2c2.6-1 5.3-1 8 .6v13.4c-2.7-1.6-5.4-1.6-8-.6V5.2Z" />
      <path d="M20 5.2c-2.6-1-5.3-1-8 .6v13.4c2.7-1.6 5.4-1.6 8-.6V5.2Z" />
    </svg>
  );
}

export function BulbIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M9.4 16.5a5.5 5.5 0 1 1 5.2 0v1.6a1 1 0 0 1-1 1h-3.2a1 1 0 0 1-1-1v-1.6Z" />
      <path d="M10.2 21h3.6" />
    </svg>
  );
}

export function LettersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M3.2 18 7 6.2h2.6L13.4 18h-2.3l-.8-2.6H6.3L5.5 18H3.2Zm3.6-4.4h3.1L8.4 8.6 6.8 13.6ZM18.2 18.2c-1.9 0-3.1-1.1-3.1-2.7 0-1.7 1.3-2.7 3.6-2.7h1.5v-.4c0-.9-.5-1.4-1.5-1.4-.9 0-1.4.4-1.6 1h-1.9c.2-1.6 1.5-2.6 3.6-2.6 2.2 0 3.4 1 3.4 3V18h-1.9l-.1-1c-.5.8-1.3 1.2-2 1.2Zm.5-1.5c1 0 1.6-.6 1.6-1.5v-.4h-1.4c-1 0-1.6.4-1.6 1 0 .6.5.9 1.4.9Z" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.4 2.5 5.2 13.4h5l-1.6 8.1 8.2-10.9h-5l1.6-8.1Z" />
    </svg>
  );
}

export function SchoolIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M4 20.5V9.8L12 4l8 5.8v10.7" />
      <path d="M9.5 20.5v-5h5v5M3 20.5h18" />
    </svg>
  );
}

export function FamilyIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <circle cx="8.5" cy="8.5" r="2.8" />
      <circle cx="16.5" cy="9.5" r="2.2" />
      <path d="M3.5 19.5c0-2.6 2.2-4.5 5-4.5s5 1.9 5 4.5M15 15.2c2.6 0 4.5 1.7 4.5 4.3" />
    </svg>
  );
}

/* Ícones do quiz. */

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={2} aria-hidden className={className}>
      <path d="M19 12H6M11 6l-6 6 6 6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={2.6} aria-hidden className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={2.6} aria-hidden className={className}>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </svg>
  );
}

export function SpeakerIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M4.5 9.5h3l4-3v11l-4-3h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" />
      <path d="M15 9.2a4 4 0 0 1 0 5.6M17.6 6.8a7.5 7.5 0 0 1 0 10.4" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <rect x="4.8" y="10.5" width="14.4" height="9.5" rx="2" />
      <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" />
    </svg>
  );
}

export function MedalIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <circle cx="12" cy="14.5" r="5.5" />
      <path d="M9 9.2 7 3.5h10l-2 5.7" />
    </svg>
  );
}

export function PawIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <ellipse cx="7" cy="8.5" rx="2.1" ry="2.7" />
      <ellipse cx="12" cy="6.8" rx="2.1" ry="2.9" />
      <ellipse cx="17" cy="8.5" rx="2.1" ry="2.7" />
      <path d="M12 11.5c2.8 0 5.2 2.3 5.2 4.6 0 1.8-1.4 2.9-3.1 2.9-1 0-1.5-.4-2.1-.4s-1.1.4-2.1.4c-1.7 0-3.1-1.1-3.1-2.9 0-2.3 2.4-4.6 5.2-4.6Z" />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.3 0 2-.8 2-1.7 0-.5-.2-.8-.5-1.1-.3-.3-.5-.7-.5-1.2 0-.9.8-1.6 1.7-1.6h1.3a4 4 0 0 0 4-4c0-4-3.6-7.4-8-7.4Z" />
      <circle cx="8" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AppleIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden className={className}>
      <path d="M12 8c-1-1-2.3-1.5-3.6-1.2C6.4 7.2 5 9.2 5 11.8c0 3.6 2.4 8 4.6 8 .9 0 1.5-.5 2.4-.5s1.5.5 2.4.5c2.2 0 4.6-4.4 4.6-8 0-2.6-1.4-4.6-3.4-5-1.3-.3-2.6.2-3.6 1.2Z" />
      <path d="M12 8V5.5M12 5.5c0-1.1.9-2 2-2" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={2} aria-hidden className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
