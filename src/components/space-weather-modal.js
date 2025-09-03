import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const SpaceWeatherModal = ({ selectedAlert, onClose }) => {
  if (!selectedAlert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6 overflow-auto"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{selectedAlert.message_type}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {selectedAlert.message_issue_time}
            </div>
          </div>
          <button
            aria-label="Close"
            className="ml-4 text-gray-700 dark:text-gray-200 hover:text-gray-900"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="mt-4">
          <div className="prose dark:prose-invert max-w-full break-words">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre: ({ node, children, ...props }) => (
                  <div className="overflow-auto">
                    <pre className="whitespace-pre-wrap break-words" {...props}>
                      {children}
                    </pre>
                  </div>
                ),
                code: ({ node, inline, className, children, ...props }) =>
                  inline ? (
                    <code className="whitespace-normal break-words" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block whitespace-pre-wrap break-words" {...props}>
                      {children}
                    </code>
                  ),
              }}
            >
              {selectedAlert.message_body}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceWeatherModal;
