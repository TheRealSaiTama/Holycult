interface Props { className?: string; size?: number }
export function Crosshair({ className = "", size = 16 }: Props) {
  return (
    <div className={`relative pointer-events-none ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-y-0 left-1/2 w-px bg-current opacity-40" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-current opacity-40" />
    </div>
  );
}

export function CrosshairFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Crosshair className="absolute top-3 left-3" />
      <Crosshair className="absolute top-3 right-3" />
      <Crosshair className="absolute bottom-3 left-3" />
      <Crosshair className="absolute bottom-3 right-3" />
      {children}
    </div>
  );
}
