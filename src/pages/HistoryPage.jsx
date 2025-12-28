import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  // Get short URL base from environment variable
  const shortUrlBase = import.meta.env.VITE_SHORT_URL_BASE || "http://localhost:8081";

  const openQrModal = (url) => {
    const qrApi = `http://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${shortUrlBase}/${url.shortKey}`;
    setQrUrl(qrApi);
    setShowQrModal(true);
  };
  
  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/urls/history?page=${page}&size=${size}`);
      setUrls(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch {
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (shortKey, id) => {
    await navigator.clipboard.writeText(`${shortUrlBase}/${shortKey}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDelete = async (shortKey) => {
    if (!window.confirm("Delete this short URL?")) return;
    await api.delete(`/api/delete/${shortKey}`);
    setUrls((prev) => prev.filter((u) => u.shortKey !== shortKey));
  };

  const isExpired = (expiresAt) =>
    new Date(expiresAt) < new Date();

  return (
    <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark dark:text-dark-text px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-start gap-8 mb-6">
        <button
          onClick={() => navigate("/generate")}
          className="px-3 py-1 rounded-md text-xs font-medium border cursor-pointer"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold ">
          URL History
        </h1>
      </div>

      {/* Card */}
      <div className="bg-bg-primary-light dark:bg-bg-primary-dark rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading && (
          <p className="p-6 text-gray-500">Loading...</p>
        )}

        {error && (
          <p className="p-6 text-red-500">{error}</p>
        )}

        {!loading && urls.length === 0 && (
          <p className="p-6 text-gray-500">No URLs found</p>
        )}

        {urls.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-bg-primary-light dark:bg-bg-primary-dark dark:text-gray-300 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Short URL</th>
                  <th className="px-4 py-3 text-left">Original URL</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Expires</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">QR</th>
                  <th className="px-4 py-3">Actions</th>

                </tr>
              </thead>

              <tbody className="divide-y">
                {urls.map((url) => (
                  <tr key={url.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <td className="px-4 py-3 font-medium text-blue-600">
                      <a
                        href={`${shortUrlBase}/${url.shortKey}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {`${shortUrlBase}/${url.shortKey}`}
                      </a>
                    </td>

                    <td className="px-4 py-3 max-w-xs truncate dark:text-gray-300">
                      {url.originalUrl}
                    </td>

                    <td className="px-4 py-3 text-center dark:text-gray-300">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-center dark:text-gray-300">
                      {new Date(url.expiresAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {isExpired(url.expiresAt) ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Expired
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                    <button
                        onClick={() => openQrModal(url)}
                        className="px-3 py-1 text-xs rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                        View
                    </button>
                    </td>


                    <td className="px-4 py-3 flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          copyToClipboard(url.shortKey, url.id)
                        }
                        className={`px-3 py-1 rounded-md text-xs font-medium flex flex-row items-center justify-center border cursor-pointer ${
                          copiedId === url.id
                            ? "bg-green-100 text-green-700 border-green-300 flex flex-row"
                            : "bg-teal-500 text-white border-gray-300 hover:bg-teal-400 flex flex-row"
                        }`}
                      >
                        {copiedId === url.id ? (
                          <>
                            Copied
                            <span className="ml-1" aria-label="copied" role="img">
                              ✓
                            </span>
                          </>
                        ) : (
                          "Copy"
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(url.shortKey)}
                        className="px-3 py-1 rounded-md text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showQrModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-80 relative">
      <h2 className="text-lg font-semibold mb-4 text-center">
        QR Code
      </h2>

      <img
        src={qrUrl}
        alt="QR Code"
        className="mx-auto mb-4"
      />

      <div className="flex justify-between">
        <a
          href={qrUrl}
          download="qr-code.png"
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Download
        </a>

        <button
          onClick={() => setShowQrModal(false)}
          className="px-4 py-2 text-sm rounded-md border"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 rounded-md border text-sm disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() =>
              setPage((p) => Math.min(p + 1, totalPages - 1))
            }
            disabled={page === totalPages - 1}
            className="px-4 py-2 rounded-md border text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
