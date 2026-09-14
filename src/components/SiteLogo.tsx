import { PlatformAvatar } from "@/components/PlatformAvatar";
import { getPlatform } from "@/lib/platforms";
import type { SupportSite } from "@/lib/sites";

export function SiteLogo({
  site,
  className,
}: {
  site?: Pick<SupportSite, "platformId" | "logoUrl">;
  className?: string;
}) {
  if (!site) return null;

  const platform = getPlatform(site.platformId);
  if (!platform) return null;

  return <PlatformAvatar platform={platform} logoUrl={site.logoUrl} className={className} />;
}