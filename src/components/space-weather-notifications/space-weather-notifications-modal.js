"use client";

import { useState } from "react";
import Modal from "../modal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SpaceWeatherNotificationsModal({ alerts }) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sorted = [...alerts].sort(
    (a, b) => new Date(b.message_issue_time) - new Date(a.message_issue_time)
  );

  const startIdx = (currentPage - 1) * itemsPerPage;
  const pageAlerts = sorted.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Space Weather Notifications</h2>

      {/* Alerts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pageAlerts.map((alert) => (
          <div
            key={alert.message_id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedAlert(alert)}
            onKeyDown={(e) => e.key === "Enter" && setSelectedAlert(alert)}
            className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow cursor-pointer hover:shadow-md focus:shadow-md outline-none"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm truncate">{alert.message_type}</h3>
              <div className="text-xs text-gray-600 dark:text-gray-300 ml-2">
                {alert.message_issue_time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {alerts.length > itemsPerPage && (
        <div className="mt-4 flex items-center justify-center space-x-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {Math.max(1, Math.ceil(alerts.length / itemsPerPage))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(Math.ceil(alerts.length / itemsPerPage), p + 1)
              )
            }
            disabled={currentPage >= Math.ceil(alerts.length / itemsPerPage)}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedAlert && (
        <Modal
          isOpen={!!selectedAlert}
          onClose={() => setSelectedAlert(null)}
          title={selectedAlert.message_type}
        >
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {selectedAlert.message_issue_time}
          </div>

          <div className="mt-4">
            <div className="prose dark:prose-invert max-w-full break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ children, ...props }) => (
                    <div className="overflow-auto">
                      <pre className="whitespace-pre-wrap break-words" {...props}>
                        {children}
                      </pre>
                    </div>
                  ),
                  code: ({ inline, children, ...props }) =>
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
        </Modal>
      )}
    </section>
  );
}
