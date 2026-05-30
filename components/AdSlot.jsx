import { useEffect } from "react";

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || "ca-pub-1285915244515596";

const DEFAULT_DISPLAY_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_DISPLAY_SLOT || "";

function pushAd() {
  if (typeof window === "undefined") {
    return;
  }

  window.adsbygoogle = window.adsbygoogle || [];

  try {
    window.adsbygoogle.push({});
  } catch {
    // Ad blockers and duplicate hydration pushes can throw; the page should keep rendering.
  }
}

function AdPlaceholder({ format, className = "" }) {
  return (
    <div className={`ad-placeholder ${className}`} aria-label="Advertisement placeholder">
      <p className="ad-placeholder__eyebrow">Advertisement</p>
      <div className="ad-placeholder__body">
        <p className="ad-placeholder__title">Your Ad Here</p>
        <p className="ad-placeholder__copy">Reach ECE students, engineers, and exam aspirants.</p>
        <div className="ad-placeholder__screen" aria-hidden="true">
          <span>ADS</span>
        </div>
      </div>
      <p className="ad-placeholder__size">{format === "vertical" ? "300 x 600" : "728 x 90"}</p>
    </div>
  );
}

export default function AdSlot({
  slot = DEFAULT_DISPLAY_SLOT,
  format = "auto",
  layout = "",
  responsive = true,
  className = "",
}) {
  const hasSlot = Boolean(slot);

  useEffect(() => {
    if (hasSlot) {
      pushAd();
    }
  }, [hasSlot, slot]);

  if (!hasSlot) {
    return <AdPlaceholder format={format} className={className} />;
  }

  return (
    <div className={`ad-slot ${className}`}>
      <p className="ad-slot__label">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout || undefined}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

export function AdRail() {
  return (
    <aside className="ad-rail" aria-label="Advertisement">
      <AdSlot format="vertical" className="ad-rail__slot" />
    </aside>
  );
}
