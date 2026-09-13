import { cn } from "@/lib/utils";
import type { Platform } from "@/lib/platforms";

export function PlatformAvatar({
  platform,
  className,
}: {
  platform: Platform;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display text-sm font-bold",
        "size-11 border border-border/60",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklab, ${platform.tint} 22%, transparent)`,
        color: platform.tint,
      }}
    >
      {platform.mark}
    </span>
  );
}
