import React, { useState } from "react";

const UrlGenerator = () => {
  const [link, setLink] = useState("");
  const [expiry, setExpiry] = useState("01-01-2026");
  const [shortUrl, setShortUrl] = useState(
    "https://botrixai.com/u/9X2KpQ"
  );

  const handleGenerate = (e) => {
    e.preventDefault();
    if (link) {
      setShortUrl("https://bt.ai/u/9X2KpQ");
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleExpiryChange = (e) => {
    setExpiry(e.target.value);
  };

  return (
    <div className="max-w-[1200px] my-12 mx-auto px-5">
      <div className="bg-white border border-[#e9ecef] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8">
        <h2 className="m-0 mb-6 text-[24px] font-bold text-[#1b1b1b]">
          <span className="text-teal">URL</span> <span className="text-teal">link</span>{" "}
          <span className="text-[#1b1b1b] font-bold">Generator</span>
        </h2>

        <form className="w-full" onSubmit={handleGenerate}>
          <div className="grid grid-cols-2 gap-4 mb-4 max-[860px]:grid-cols-1">
            <label className="relative" htmlFor="url-input">
              <input
                id="url-input"
                className="w-full h-12 border border-[#e5e5e5] rounded-lg px-4 text-base outline-none bg-white text-[#1b1b1b] placeholder:text-[#999999] focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                type="url"
                placeholder="Enter the Link"
                value={link}
                onChange={handleLinkChange}
                required
                aria-label="Enter URL to shorten"
              />
            </label>

            <div className="relative">
              <input
                className="w-full h-12 border border-[#e5e5e5] rounded-lg px-4 pr-12 text-base outline-none bg-white text-[#1b1b1b] placeholder:text-[#999999]"
                value={shortUrl}
                readOnly
                aria-label="Generated short URL"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e5e5] bg-white text-[#7b8a92] cursor-pointer hover:text-teal hover:border-teal transition-all"
                onClick={handleCopyUrl}
                title="Copy short link"
                aria-label="Copy short URL to clipboard"
                tabIndex={0}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="relative block" htmlFor="expiry-date">
              <input
                id="expiry-date"
                className="w-full h-12 border border-[#e5e5e5] rounded-lg px-4 text-base outline-none bg-white text-[#1b1b1b] placeholder:text-[#999999] focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                type="date"
                value={expiry}
                onChange={handleExpiryChange}
                aria-label="Select expiry date"
              />
              {!expiry && (
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#999999] text-base">
                  Ending Date
                </span>
              )}
            </label>
          </div>

          <button 
            className="w-full h-12 bg-teal text-white font-semibold text-base rounded-lg border-none cursor-pointer shadow-[0_6px_18px_rgba(14,165,164,0.35)] transition-all hover:bg-teal-dark hover:shadow-[0_8px_22px_rgba(14,165,164,0.40)] hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2" 
            type="submit"
            aria-label="Generate short URL"
            tabIndex={0}
          >
            Generate URL
          </button>
        </form>
      </div>
    </div>
  );
};

export default UrlGenerator;
