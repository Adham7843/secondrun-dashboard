import React from "react";

interface CompanyLogoProps {
  slug: string;
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function CompanyLogo({
  slug,
  name,
  className = "",
  size = "md",
}: CompanyLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-14 h-14 text-lg",
  }[size];

  const initial = name.charAt(0).toUpperCase();

  // Bespoke Stylized SVG Lettermarks for Each Platform
  switch (slug) {
    case "atrium":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Architectural Serif Letter A */}
            <path d="M20 7L11 31H15.5L18 24H22L24.5 31H29L20 7Z" fill="#FAF9F6" />
            <path d="M20 12.5L18.7 20.5H21.3L20 12.5Z" fill="#141416" />
            <rect x="17.5" y="21.5" width="5" height="2" fill="#991B1B" />
          </svg>
        </div>
      );

    case "fast":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized High-Velocity Slanted Letter F */}
            <path d="M14 31L18.5 9H30L29 13.5H22L20.8 18.5H27.5L26.5 22.5H19.8L17.8 31H14Z" fill="#FAF9F6" />
            <rect x="22" y="9" width="8" height="4.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "pebble":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Rounded Letter P with E-Paper Counter */}
            <path d="M13 31V9H22.5C26.5 9 29 11.5 29 15.5C29 19.5 26.5 22 22.5 22H17.5V31H13ZM17.5 17.5H22C23.8 17.5 24.8 16.8 24.8 15.5C24.8 14.2 23.8 13.5 22 13.5H17.5V17.5Z" fill="#FAF9F6" />
            <circle cx="21" cy="15.5" r="1.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "rdio":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Circular Letter R with Curved Acoustic Stem */}
            <path d="M13 31V9H22C26.5 9 29 11.5 29 15.5C29 18.5 27 20.8 24 21.6L29.5 31H24.5L19.5 22H17.5V31H13ZM17.5 18H21.5C23.5 18 24.8 17.2 24.8 15.5C24.8 13.8 23.5 13 21.5 13H17.5V18Z" fill="#FAF9F6" />
            <circle cx="21" cy="15.5" r="1.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "scalefactor":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Monogram SF */}
            <path d="M26 14H18.5C16.5 14 15 15.2 15 17C15 18.8 16.5 19.8 19 20.2L22 20.8C25 21.4 27 22.8 27 25.5C27 28.8 24.2 31 20 31C16 31 13.5 29 13 26H17.2C17.6 27.2 18.8 28 20.2 28C22 28 23 27 23 25.5C23 24 21.8 23.2 19.5 22.8L16.5 22.2C13.8 21.6 11.8 20 11.8 17.2C11.8 14 14.5 11 19 11H26V14Z" fill="#FAF9F6" />
            <rect x="25" y="11" width="4" height="20" fill="#991B1B" />
            <rect x="29" y="11" width="5" height="3" fill="#FAF9F6" />
            <rect x="29" y="19" width="4" height="3" fill="#FAF9F6" />
          </svg>
        </div>
      );

    case "higherme":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Stepped Letter H with Elevated Crossbar */}
            <path d="M12 31V9H16.5V18H23.5V9H28V31H23.5V22H16.5V31H12Z" fill="#FAF9F6" />
            <path d="M16.5 18H23.5L20 15L16.5 18Z" fill="#991B1B" />
          </svg>
        </div>
      );

    case "shyp":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Faceted Letter S */}
            <path d="M26 14H18.5C16.5 14 15 15.2 15 17C15 18.8 16.5 19.8 19 20.2L22 20.8C25 21.4 27 22.8 27 25.5C27 28.8 24.2 31 20 31C16 31 13.5 29 13 26H17.2C17.6 27.2 18.8 28 20.2 28C22 28 23 27 23 25.5C23 24 21.8 23.2 19.5 22.8L16.5 22.2C13.8 21.6 11.8 20 11.8 17.2C11.8 14 14.5 11 19 11H26V14Z" fill="#FAF9F6" />
            <rect x="21" y="19" width="4" height="4" rx="1" fill="#991B1B" />
          </svg>
        </div>
      );

    case "jawbone":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Architectural Letter J with Grille Cuts */}
            <path d="M22 9H27V24C27 28 24.5 31 19.5 31C14.5 31 12 28 12 24H16.8C16.8 25.8 17.8 27 19.5 27C21.2 27 22.2 25.8 22.2 24V9H22Z" fill="#FAF9F6" />
            <rect x="22" y="14" width="5" height="2" fill="#991B1B" />
            <rect x="22" y="18" width="5" height="2" fill="#991B1B" />
          </svg>
        </div>
      );

    case "secret":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Mask-Curvature Letter S */}
            <path d="M26 14.5C24.5 12 22 10.5 19 10.5C14.5 10.5 12 13.5 12 17C12 23 27 19 27 25C27 28.5 24 30.5 19.5 30.5C15.5 30.5 13 28.5 11.5 25.5L15 23.5C16 25.5 17.5 26.8 19.5 26.8C22 26.8 23 25.8 23 24.5C23 19 8 23 8 16.5C8 12.5 11.5 9.5 16.5 9.5C20.5 9.5 23.5 11.5 25.5 14L26 14.5Z" fill="#FAF9F6" />
            <circle cx="21" cy="18" r="2" fill="#991B1B" />
          </svg>
        </div>
      );

    case "homejoy":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Roofline Letter H */}
            <path d="M12 31V12L20 7L28 12V31H23.5V21H16.5V31H12ZM16.5 17H23.5L20 12.5L16.5 17Z" fill="#FAF9F6" />
            <circle cx="20" cy="15" r="1.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "zirtual":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Serif Letter Z */}
            <path d="M12 10H28V14.5L17.5 26.5H28V31H12V26.5L22.5 14.5H12V10Z" fill="#FAF9F6" />
            <rect x="23" y="10" width="5" height="4.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "starsky-robotics":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Angled Trajectory Letter S */}
            <path d="M26 14H18.5C16.5 14 15 15.2 15 17C15 18.8 16.5 19.8 19 20.2L22 20.8C25 21.4 27 22.8 27 25.5C27 28.8 24.2 31 20 31C16 31 13.5 29 13 26H17.2C17.6 27.2 18.8 28 20.2 28C22 28 23 27 23 25.5C23 24 21.8 23.2 19.5 22.8L16.5 22.2C13.8 21.6 11.8 20 11.8 17.2C11.8 14 14.5 11 19 11H26V14Z" fill="#FAF9F6" />
            <line x1="12" y1="20" x2="28" y2="20" stroke="#991B1B" strokeWidth="2" strokeDasharray="2 2" />
          </svg>
        </div>
      );

    case "mailmodo":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Folded Envelope Letter M */}
            <path d="M12 31V9H16.5L20 19L23.5 9H28V31H24V16L21 23H19L16 16V31H12Z" fill="#FAF9F6" />
            <rect x="18" y="21" width="4" height="3" fill="#991B1B" />
          </svg>
        </div>
      );

    case "eden":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Modern Modular Letter E */}
            <path d="M13 9H27V13.5H18V18H25V22.5H18V26.5H27V31H13V9Z" fill="#FAF9F6" />
            <rect x="24" y="9" width="4" height="4.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "flightcar":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Aerodynamic Letter F */}
            <path d="M13 9H28V13.5H18V18H26V22.5H18V31H13V9Z" fill="#FAF9F6" />
            <path d="M24 9L28 13.5H24V9Z" fill="#991B1B" />
          </svg>
        </div>
      );

    case "lily-robotics":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Geometric Letter L */}
            <path d="M14 9V26.5H27V31H9V9H14Z" fill="#FAF9F6" />
            <rect x="22" y="26.5" width="5" height="4.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "teforia":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Architectural Serif Letter T */}
            <path d="M10 9H30V13.5H22.5V31H17.5V13.5H10V9Z" fill="#FAF9F6" />
            <rect x="18.5" y="9" width="3" height="4.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "omni":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Geometric Hex-Cubic Letter O */}
            <path d="M20 9C26.5 9 30 13.5 30 20C30 26.5 26.5 31 20 31C13.5 31 10 26.5 10 20C10 13.5 13.5 9 20 9ZM20 13.5C16.5 13.5 14.8 16 14.8 20C14.8 24 16.5 26.5 20 26.5C23.5 26.5 25.2 24 25.2 20C25.2 16 23.5 13.5 20 13.5Z" fill="#FAF9F6" />
            <circle cx="20" cy="20" r="2" fill="#991B1B" />
          </svg>
        </div>
      );

    case "doppler-labs":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Acoustic Arc Letter D */}
            <path d="M13 31V9H21C26.5 9 29.5 13.5 29.5 20C29.5 26.5 26.5 31 21 31H13ZM17.8 26.5H20.5C23.8 26.5 25.2 23.5 25.2 20C25.2 16.5 23.8 13.5 20.5 13.5H17.8V26.5Z" fill="#FAF9F6" />
            <circle cx="21" cy="20" r="1.8" fill="#991B1B" />
          </svg>
        </div>
      );

    case "lunchbadger":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Gateway Node Letter L */}
            <path d="M14 9V26.5H27V31H9V9H14Z" fill="#FAF9F6" />
            <circle cx="14" cy="9" r="2" fill="#991B1B" />
          </svg>
        </div>
      );

    case "shipwise":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Cargo Direction Letter S */}
            <path d="M26 14H18.5C16.5 14 15 15.2 15 17C15 18.8 16.5 19.8 19 20.2L22 20.8C25 21.4 27 22.8 27 25.5C27 28.8 24.2 31 20 31C16 31 13.5 29 13 26H17.2C17.6 27.2 18.8 28 20.2 28C22 28 23 27 23 25.5C23 24 21.8 23.2 19.5 22.8L16.5 22.2C13.8 21.6 11.8 20 11.8 17.2C11.8 14 14.5 11 19 11H26V14Z" fill="#FAF9F6" />
            <path d="M20 7L24 10H16L20 7Z" fill="#991B1B" />
          </svg>
        </div>
      );

    case "quibi":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Modern Letter Q with Velocity Cut */}
            <circle cx="20" cy="19" r="10" stroke="#FAF9F6" strokeWidth="4" fill="none" />
            <path d="M23 23L29 29" stroke="#991B1B" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      );

    case "theranos":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Clinical Serif Letter T with Blood Droplet Counter */}
            <path d="M10 10H30V15H22V31H18V15H10V10Z" fill="#FAF9F6" />
            <circle cx="20" cy="7" r="2" fill="#991B1B" />
          </svg>
        </div>
      );

    case "juicero":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Press Letter J with Crimson Pressure Bar */}
            <path d="M24 9V24C24 27.5 21.5 30 18 30C14.5 30 12 27.5 12 24H16.5C16.5 25.5 17.2 26.2 18 26.2C18.8 26.2 19.5 25.5 19.5 24V9H24Z" fill="#FAF9F6" />
            <rect x="12" y="7" width="16" height="3" fill="#991B1B" />
          </svg>
        </div>
      );

    case "solyndra":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Solar Cylinder Letter S */}
            <path d="M25 14H17C15 14 14 15 14 16.5C14 18 15 19 17 19.5L22 20.5C25 21 26.5 22.5 26.5 25C26.5 28 24 30 20 30C16 30 13.5 28 13.5 25.5H17.5C17.5 26.5 18.5 27 20 27C21.5 27 22.5 26.5 22.5 25C22.5 24 21.5 23.5 19.5 23L14.5 22C12 21.5 10 20 10 16.5C10 13.5 13 11 17 11H25V14Z" fill="#FAF9F6" />
            <circle cx="28" cy="11" r="2.5" fill="#991B1B" />
          </svg>
        </div>
      );

    case "webvan":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Dotcom Van Velocity Letter W */}
            <path d="M9 10L14 30H18L20 21L22 30H26L31 10H26.5L23.5 23.5L21.5 14H18.5L16.5 23.5L13.5 10H9Z" fill="#FAF9F6" />
            <circle cx="20" cy="32" r="2" fill="#991B1B" />
          </svg>
        </div>
      );

    case "vine":
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            {/* Stylized Looping Video Letter V */}
            <path d="M12 11L18 29H22L28 11H23.5L20 22.5L16.5 11H12Z" fill="#FAF9F6" />
            <circle cx="20" cy="8" r="2" fill="#991B1B" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`shrink-0 flex items-center justify-center rounded-xs bg-[#18181B] border border-ink-300/80 shadow-2xs ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 40 40" fill="none" className="w-4/5 h-4/5" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="2" fill="#141416" />
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="20"
              fontWeight="bold"
              fill="#FAF9F6"
            >
              {initial}
            </text>
            <circle cx="31" cy="9" r="2" fill="#991B1B" />
          </svg>
        </div>
      );
  }
}
