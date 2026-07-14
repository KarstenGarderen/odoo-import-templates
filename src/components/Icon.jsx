// Minimal inline SVG icon set (stroke style, currentColor).
const PATHS = {
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M15.8 14.4c2.3.2 4.1 1.7 4.7 4.1" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2 11.2h10.9l1.9-8.4H6.2" />
      <circle cx="9" cy="19.5" r="1.4" />
      <circle cx="16.5" cy="19.5" r="1.4" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 19.5c.8-3.4 3.4-5.3 6.5-5.3s5.7 1.9 6.5 5.3" />
    </>
  ),
  tag: (
    <>
      <path d="M12.4 3.5H20v7.6l-8.4 8.4a1.8 1.8 0 0 1-2.6 0l-5-5a1.8 1.8 0 0 1 0-2.6z" transform="rotate(180 12 12)" />
      <circle cx="8.3" cy="8.3" r="1.3" />
    </>
  ),
  bank: (
    <>
      <path d="M3.5 9.5 12 4l8.5 5.5" />
      <path d="M5.5 10v7M10 10v7M14 10v7M18.5 10v7" />
      <path d="M3.5 19.5h17" />
    </>
  ),
  box: (
    <>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8z" />
      <path d="M4 8l8 4.3L20 8M12 12.3V20" />
    </>
  ),
  folder: (
    <>
      <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4.3l2 2.4H19a1.5 1.5 0 0 1 1.5 1.5v8.6a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
    </>
  ),
  pricetag: (
    <>
      <path d="M11.6 3.5H20v8.4l-8.1 8.1a1.8 1.8 0 0 1-2.5 0l-5.9-5.9a1.8 1.8 0 0 1 0-2.5z" />
      <circle cx="15.7" cy="7.8" r="1.3" />
    </>
  ),
  rules: (
    <>
      <path d="M8.5 6h12M8.5 12h12M8.5 18h12" />
      <circle cx="4.5" cy="6" r="1.2" />
      <circle cx="4.5" cy="12" r="1.2" />
      <circle cx="4.5" cy="18" r="1.2" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20z" />
      <path d="M14 3.5V8h4M9 12.5h6M9 16h6" />
    </>
  ),
  industry: (
    <>
      <path d="M3.5 20.5V9.5l5.5 3.5V9.5l5.5 3.5V5.5h6v15z" />
      <path d="M17 9.5h1.5M17 13h1.5M17 16.5h1.5" />
    </>
  ),
  sheet: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M4 9h16M9.3 9v11M4 14.5h16" />
    </>
  ),
  upload: (
    <>
      <path d="M12 15V4.5M7.5 8.5 12 4l4.5 4.5" />
      <path d="M4.5 15.5v3a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-3" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.3l2.4 2.4 5-5" />
    </>
  ),
  broom: (
    <>
      <path d="M13.5 3.5 10 10.5" />
      <path d="M5.5 20.5c.5-4 2-7 4.5-8.5l4 2c-.2 3-1.5 5.5-3.5 7z" />
    </>
  ),
  code: (
    <>
      <path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5" />
    </>
  ),
  bulb: (
    <>
      <path d="M12 3.5a5.8 5.8 0 0 0-3.2 10.6c.7.5 1.2 1.4 1.2 2.4h4c0-1 .5-1.9 1.2-2.4A5.8 5.8 0 0 0 12 3.5z" />
      <path d="M10 19.5h4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="1.8" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16" rx="1.8" />
      <path d="M9 4.5a3 3 0 0 1 6 0M9 10.5h6M9 14h6M9 17.5h3.5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8z" />
      <path d="M3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </>
  ),
  flag: (
    <>
      <path d="M5.5 21V4" />
      <path d="M5.5 4.5c4-2 7 2 11.5.5v8c-4.5 1.5-7.5-2.5-11.5-.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  logo: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M12 7.5v6M9 11l3 2.8 3-2.8M7.5 16.5h9" />
    </>
  ),
}

export default function Icon({ name, size = 22 }) {
  const paths = PATHS[name] || PATHS.box
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths}
    </svg>
  )
}
