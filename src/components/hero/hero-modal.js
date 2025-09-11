"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "../modal";

export default function HeroModalTrigger({ heroData }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="View full image"
        className="inline-block px-3 py-2 bg-sky-600 text-white text-xs rounded hover:bg-sky-700 transition"
      >
        View full media
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="max-w-5xl"
        ariaLabel={heroData?.title}
      >
        <div className="w-full flex items-center justify-center">
          <Image
            src={heroData?.url}
            alt={heroData?.title || "NASA Picture of the Day"}
            className="w-full h-auto max-h-[85vh] object-contain"
            unoptimized
          />
        </div>
      </Modal>
    </>
  );
}
