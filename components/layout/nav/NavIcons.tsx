import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Plastic Moulds Icon:
 * Isometric injection mould tooling assembly showing upper clamping plate,
 * injection sprue nozzle, precision core/cavity block, parting line, and ejector pins.
 */
export function PlasticMouldsIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Upper clamping plate */}
      <rect x="3" y="3" width="18" height="4.5" rx="1" />
      {/* Central injection sprue in brand red */}
      <path d="M12 1.5v3" stroke="#E03A2B" strokeWidth="2" />
      <path d="M10 7.5l2 2.5 2-2.5" stroke="#E03A2B" />
      {/* Cavity block */}
      <path d="M6 7.5v5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-5" />
      {/* Internal core protrusion with red accent */}
      <path d="M9 10h6v3a0.75 0.75 0 0 1-0.75 0.75h-4.5A0.75 0.75 0 0 1 9 13v-3z" stroke="#E03A2B" />
      {/* Parting line */}
      <line x1="2.5" y1="14" x2="21.5" y2="14" strokeDasharray="1.5 1.5" />
      {/* Lower ejector base plate */}
      <rect x="3" y="16.5" width="18" height="4.5" rx="1" />
      {/* Precision ejector pins */}
      <line x1="7" y1="14" x2="7" y2="16.5" stroke="#E03A2B" />
      <line x1="17" y1="14" x2="17" y2="16.5" stroke="#E03A2B" />
    </svg>
  );
}

/**
 * Casting Dies Icon:
 * High-pressure die casting tooling block with tie bars, split line,
 * casting cavity, and molten runner gate.
 */
export function CastingDiesIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Heavy die block frame */}
      <rect x="3" y="3.5" width="18" height="17" rx="2" />
      {/* Die parting split line */}
      <line x1="3" y1="12" x2="21" y2="12" strokeDasharray="2 1.5" />
      {/* High-pressure casting upper chamber */}
      <path d="M8 7.5h8v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-3z" />
      {/* High-pressure casting lower chamber */}
      <path d="M8 16.5h8v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3z" />
      {/* High-pressure runner & gate in brand red */}
      <path d="M12 3.5v4" stroke="#E03A2B" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill="#E03A2B" stroke="#E03A2B" />
      {/* Die tie-bar bushings */}
      <circle cx="5.5" cy="6" r="0.75" fill="currentColor" />
      <circle cx="18.5" cy="6" r="0.75" fill="currentColor" />
      <circle cx="5.5" cy="18" r="0.75" fill="currentColor" />
      <circle cx="18.5" cy="18" r="0.75" fill="currentColor" />
    </svg>
  );
}

/**
 * Casting Spares Icon:
 * Micron-tolerance ground cylindrical shot sleeve / ejector plunger
 * with stepped diameter and radial caliper measurement ticks.
 */
export function CastingSparesIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Head collar */}
      <path d="M7 3.5h10v3.5H7z" />
      {/* Precision ground shaft */}
      <path d="M8.5 7h7v10h-7z" />
      {/* Precision ground tolerance micro-grooves */}
      <line x1="8.5" y1="10" x2="15.5" y2="10" stroke="#E03A2B" />
      <line x1="8.5" y1="13.5" x2="15.5" y2="13.5" stroke="#E03A2B" />
      {/* Chamfered pilot tip */}
      <path d="M9.5 17h5v2.5a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V17z" />
      {/* Dimensional tolerance indicators */}
      <path d="M4 10l2 2-2 2" stroke="#E03A2B" />
      <path d="M20 10l-2 2 2 2" stroke="#E03A2B" />
    </svg>
  );
}

/**
 * Sheet Metal Tool Icon:
 * Precision progressive stamping punch descending into a hardened die bed
 * forming an engineered sheet metal profile.
 */
export function SheetMetalToolIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Upper punch tool */}
      <path d="M9 2.5h6v4.5l-2 2v2.5h-2V9L9 7V2.5z" />
      <line x1="12" y1="2.5" x2="12" y2="6" stroke="#E03A2B" />
      {/* Formed sheet metal blank in red */}
      <path d="M3 13.5h5.5l3.5 3.5 3.5-3.5H21" stroke="#E03A2B" strokeWidth="2" />
      {/* Lower hardened die bed with forming V-groove */}
      <path d="M3 16.5h5.5l3.5 3.5 3.5-3.5H21v3.5H3v-3.5z" />
      {/* Pillar guide lines */}
      <line x1="4.5" y1="6" x2="4.5" y2="11.5" strokeDasharray="1.5 1.5" />
      <line x1="19.5" y1="6" x2="19.5" y2="11.5" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

/**
 * Chrome Plating Icon:
 * Industrial electroplating cross-section showing steel substrate,
 * uniform deposited hard-chrome crystalline layer, and electrochemical flux lines.
 */
export function ChromePlatingIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Steel component substrate base */}
      <rect x="3" y="14" width="18" height="6.5" rx="1" />
      {/* Cross-hatch industrial metal base lines */}
      <line x1="6" y1="17.5" x2="8" y2="19.5" />
      <line x1="11" y1="17.5" x2="13" y2="19.5" />
      <line x1="16" y1="17.5" x2="18" y2="19.5" />
      {/* Hard chrome deposited surface micro-layer */}
      <path d="M3 11h18v3H3z" fill="rgba(224,58,43,0.12)" stroke="#E03A2B" strokeWidth="1.5" />
      {/* Electrolytic flux lines / chemical deposition */}
      <path d="M7 4v4m0 0l-1-1m1 1l1-1" stroke="#E03A2B" />
      <path d="M12 3v5m0 0l-1-1m1 1l1-1" stroke="#E03A2B" strokeWidth="1.5" />
      <path d="M17 4v4m0 0l-1-1m1 1l1-1" stroke="#E03A2B" />
      {/* Micro-finish gauge indicator */}
      <circle cx="12" cy="12.5" r="0.75" fill="#E03A2B" />
    </svg>
  );
}

/**
 * Our Story Icon:
 * Precision vernier caliper with graduation ticks measuring an engineered workpiece,
 * symbolizing founding craftsmanship, heritage, and dimensional discipline.
 */
export function OurStoryIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Caliper main beam */}
      <path d="M3 5.5h18v4H3z" />
      {/* Fixed outer jaw */}
      <path d="M3 5.5v12.5l3-4V9.5" />
      {/* Vernier scale graduation ticks */}
      <line x1="8" y1="5.5" x2="8" y2="7.5" />
      <line x1="11" y1="5.5" x2="11" y2="8.5" stroke="#E03A2B" />
      <line x1="14" y1="5.5" x2="14" y2="7.5" />
      <line x1="17" y1="5.5" x2="17" y2="8.5" stroke="#E03A2B" />
      {/* Sliding jaw assembly */}
      <path d="M12.5 4h4v5.5l-2 6.5-2-2V9.5" />
      {/* Workpiece being measured in brand red */}
      <rect
        x="6"
        y="11.5"
        width="4.5"
        height="3"
        rx="0.5"
        stroke="#E03A2B"
        fill="rgba(224,58,43,0.12)"
      />
    </svg>
  );
}

/**
 * Our Mission & Vision Icon:
 * Optical laser measurement reticle with calibration crosshairs and
 * sub-micron bullseye, symbolizing strategic accuracy and manufacturing foresight.
 */
export function MissionVisionIcon({ className = "w-5 h-5", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Outer precision collimator ring */}
      <circle cx="12" cy="12" r="9" />
      {/* Inner tolerance boundary ring */}
      <circle cx="12" cy="12" r="5" strokeDasharray="2 1.5" />
      {/* Precision reticle crosshairs with red tips */}
      <line x1="12" y1="2" x2="12" y2="5.5" stroke="#E03A2B" strokeWidth="2" />
      <line x1="12" y1="18.5" x2="12" y2="22" stroke="#E03A2B" strokeWidth="2" />
      <line x1="2" y1="12" x2="5.5" y2="12" stroke="#E03A2B" strokeWidth="2" />
      <line x1="18.5" y1="12" x2="22" y2="12" stroke="#E03A2B" strokeWidth="2" />
      {/* Sub-micron center bullseye in brand red */}
      <circle cx="12" cy="12" r="1.5" fill="#E03A2B" stroke="#E03A2B" />
    </svg>
  );
}

const ICON_REGISTRY: Record<string, React.ComponentType<IconProps>> = {
  OurStory: OurStoryIcon,
  MissionVision: MissionVisionIcon,
  PlasticMoulds: PlasticMouldsIcon,
  CastingDies: CastingDiesIcon,
  CastingSpares: CastingSparesIcon,
  SheetMetalTool: SheetMetalToolIcon,
  ChromePlating: ChromePlatingIcon,
};

export function getNavIcon(name?: string): React.ComponentType<IconProps> {
  if (name && ICON_REGISTRY[name]) {
    return ICON_REGISTRY[name];
  }
  return PlasticMouldsIcon;
}
