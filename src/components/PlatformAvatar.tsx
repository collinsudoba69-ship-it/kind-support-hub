import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { platformLogoUrl, type Platform } from "@/lib/platforms";

export function PlatformAvatar({
  platform,
  logoUrl,
  className,
}: {
  platform: Platform;
  /** Manual logo override (image URL). Falls back to the official brand logo. */
  logoUrl?: string;
  className?: string;
}) {
  const src = logoUrl?.trim() || platformLogoUrl(platform) || null;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display text-sm font-bold",
        "size-11 border border-border/60",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklab, ${platform.tint} 22%, transparent)`,
        color: platform.tint,
      }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={`${platform.name} logo`}
          loading="lazy"
          className="size-full object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      ) : (
        platform.mark
      )}
    </span>
  );
}
