"use client";

import { useEffect, useRef } from "react";

export default function FullscreenPage() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const nav = (page: string) => {
    window.location.href = page;
  };

  const fullscreen = () => {
    if (overlayRef.current) {
      overlayRef.current.style.zIndex = "0";
    }
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn("Fullscreen error:", err);
    });
  };

  const checkFullScreen = () => {
    if (!overlayRef.current) return;
    const isFullScreen =
      window.innerHeight === screen.height &&
      window.innerWidth === screen.width;
    overlayRef.current.style.zIndex = isFullScreen ? "0" : "737";
  };

  useEffect(() => {
    const handleClick = () => fullscreen();
    document.body.addEventListener("click", handleClick);

    window.addEventListener("resize", () => setTimeout(checkFullScreen, 37));
    window.addEventListener("orientationchange", () =>
      setTimeout(checkFullScreen, 37)
    );

    return () => {
      document.body.removeEventListener("click", handleClick);
      window.removeEventListener("resize", () =>
        setTimeout(checkFullScreen, 37)
      );
      window.removeEventListener("orientationchange", () =>
        setTimeout(checkFullScreen, 37)
      );
    };
  }, []);

  return (
    <div className="m-0 p-0">
      {/* Transparent overlay div */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 h-screen w-[150vw] opacity-0 bg-white overflow-y-scroll"
        style={{ zIndex: 737 }}
      ></div>

      {/* Embedded content */}
      <embed
        src="/"
        className="fixed top-0 left-0 w-screen h-screen border-0 m-0 p-0"
      />
    </div>
  );
}
