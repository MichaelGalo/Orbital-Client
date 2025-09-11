"use client";
import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, title, children, footer, className = "", ariaLabel }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onOverlayClick = (event) => {
    if (event.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label={ariaLabel || title}
    >
      <div className={`w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto max-h-[90vh] ${className}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between gap-4">
          {title ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            </div>
          ) : null}

          <div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 text-sm text-gray-800 dark:text-gray-200">{children}</div>

        {footer ? <div className="p-4 border-t border-gray-200 dark:border-gray-700">{footer}</div> : null}
      </div>
    </div>
  );
};

export default Modal;
