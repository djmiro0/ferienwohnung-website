"use client";

import Script from "next/script";
import { useCallback, useState } from "react";

declare global {
  interface Window {
    BookingToolIframe?: {
      initialize: (options: { url: string; baseUrl: string; target: string }) => void;
    };
  }
}

const bookingPage = "https://booking.smoobu.com/9A1852331";

type BookingCopy = {
  loading: string;
  failed: string;
  fallbackPrefix: string;
  fallbackLink: string;
  fallbackSuffix: string;
};

export function BookingWidget({ copy }: { copy: BookingCopy }) {
  const [failed, setFailed] = useState(false);

  const initialize = useCallback(() => {
    const container = document.querySelector<HTMLDivElement>("#smoobu-booking-widget");
    if (!container || container.querySelector("iframe") || !window.BookingToolIframe) return;

    container.replaceChildren();
    window.BookingToolIframe.initialize({
      url: "https://login.smoobu.com/de/booking-tool/iframe/1852331?apartmentGroups[]=3464021&apartmentGroups[]=3526331",
      baseUrl: "https://login.smoobu.com",
      target: "#smoobu-booking-widget",
    });
  }, []);

  return (
    <div className="booking-widget-shell">
      <div id="smoobu-booking-widget" className="booking-widget" aria-live="polite">
        {!failed && <p className="booking-loading">{copy.loading}</p>}
        {failed && <p>{copy.failed}</p>}
      </div>

      <Script
        id="smoobu-booking-script"
        src="https://login.smoobu.com/js/Settings/BookingToolIframe.js"
        strategy="lazyOnload"
        onReady={initialize}
        onError={() => setFailed(true)}
      />

      <p className="booking-fallback">
        {copy.fallbackPrefix}{" "}
        <a href={bookingPage} target="_blank" rel="noreferrer">
          {copy.fallbackLink}
        </a>
        {copy.fallbackSuffix}
      </p>
    </div>
  );
}
