"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function FlashcardPage() {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const courseUrl = localStorage.getItem("course");
    if (iframeRef.current && courseUrl) {
      iframeRef.current.src = courseUrl;
    }

    if (!localStorage.getItem("token")) {
      router.push("../");
    }
  }, [router]);

  const goBack = () => {
    router.push("../learninghub");
  };

  return (
    <div className="w-full h-screen bg-gray-100 relative">
      {/* Iframe */}
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Embedded Website"
      />

      {/* Go Back Button */}
      <button
        onClick={goBack}
        className="fixed top-[3vw] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-red-500 text-white px-[4vw] py-[1vw] rounded-md text-[2.6vw] shadow-md hover:bg-green-600"
      >
        <svg
          width="2.6vw"
          height="2.6vw"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z"
            fill="white"
          />
        </svg>
        <span className="ml-[0.7vw] pb-[0.5vw] font-medium">Go Back</span>
      </button>
    </div>
  );
}
