import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaHistory, FaSignOutAlt, FaUser } from 'react-icons/fa';
import  BotrixAI_Light  from "../assets/BotrixAI_Light.avif";
import  BotrixAI_Dark  from "../assets/BotrixAI_Dark.avif";
import api from "../api/axios";

const UrlGeneratorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    longLink: '',
    customCode: '',
    expiryDate: '',
  });
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [expiryInfo, setExpiryInfo] = useState(null);
  const [qrCodeBase64, setQrCodeBase64] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateExpiryDays = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : null;
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("lastGeneratedUrl");
    if (saved) {
      const parsed = JSON.parse(saved);
      setGeneratedUrl(parsed.shortUrl);
      setQrCodeBase64(parsed.qrCodeBase64);
      if (parsed.expiryInfo) {
        setExpiryInfo({ rawDate: parsed.expiryInfo });
      }
    }
  }, []);
  

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    if (!formData.longLink) {
      setError("Please enter a long link");
      setIsLoading(false);
      return;
    }
  
    try {
      const requestBody = {
        url: formData.longLink,
      };
  
      if (formData.customCode?.trim()) {
        requestBody.customCode = formData.customCode.trim();
      }
  
      const expiryDays = calculateExpiryDays(formData.expiryDate);
      if (expiryDays && expiryDays > 0) {
        requestBody.expiryDays = expiryDays;
      }
  
      // ✅ JWT automatically attached via axios interceptor
      const { data } = await api.post("/api/shorten", requestBody);
  
      setGeneratedUrl(data.shortUrl);
  
      if (data.qrCodeBase64) {
        setQrCodeBase64(data.qrCodeBase64);
      }
  
      if (data.expiryDate) {
        const expiry = new Date(data.expiryDate);
        setExpiryInfo({
          date: expiry.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: expiry.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          rawDate: data.expiryDate,
        });
      } else {
        setExpiryInfo(null);
      }

      const generatedData = {
        shortUrl: data.shortUrl,
        qrCodeBase64: data.qrCodeBase64,
        expiryInfo: data.expiryDate
      };
      
      sessionStorage.setItem("lastGeneratedUrl", JSON.stringify(generatedData));
      
  
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to generate short URL";
  
      setError(message);
      setGeneratedUrl("");
      setQrCodeBase64("");
      setExpiryInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleHistory = () => {
    console.log('History clicked');
    navigate("/history");
    // Will implement history page later
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  

  return (
    <>
      <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark dark:text-dark-text">
        {/* Page Header */}
        
        
        <div className="bg-bg-primary-light dark:bg-bg-primary-dark  border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={BotrixAI_Light} className="h-16 w-auto dark:hidden"/>
              <img src={BotrixAI_Dark} className="h-16 w-auto hidden dark:block"/>

            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleHistory}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="View history"
                tabIndex={0}
              >
                <FaHistory size={20} className="text-gray-700" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Logout"
                tabIndex={0}
              >
                <FaSignOutAlt size={20} className="text-gray-700" aria-hidden="true" />
              </button>
              {/* <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center text-white font-semibold">
                M
              </div> */}
              <button onClick={() => navigate("/profile")}>
              <FaUser size={20} className="text-gray-700" aria-hidden="true" /> 
            </button>

            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            <span className="text-teal">Short URL Generator</span>
          </h1>

          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Long Link Field */}
            <div>
              <input
                id="longLink"
                name="longLink"
                type="url"
                value={formData.longLink}
                onChange={handleInputChange}
                required
                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base outline-none bg-bg-primary-light dark:bg-bg-primary-dark text-gray-400 placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                placeholder="Enter the Link"
                aria-label="Enter long URL to shorten"
              />
            </div>

            {/* Custom Code Field */}
            <div>
              <input
                id="customCode"
                name="customCode"
                type="text"
                value={formData.customCode}
                onChange={handleInputChange}
                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base outline-none bg-bg-primary-light dark:bg-bg-primary-dark text-gray-400 placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                placeholder="Custom Code (Optional)"
                aria-label="Enter custom code for URL"
                pattern="[A-Za-z0-9_-]+"
                title="Only letters, numbers, hyphens, and underscores allowed"
              />
            </div>

            {/* Expiry Date Field */}
            <div>
              <input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base outline-none bg-bg-primary-light dark:bg-bg-primary-dark  text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                aria-label="Select expiry date"
                placeholder="Expiry Date (Optional)"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-14 bg-teal-500 text-white font-semibold text-lg rounded-lg border-none cursor-pointer shadow-[0_6px_18px_rgba(14,165,164,0.35)] transition-all hover:bg-teal-dark hover:shadow-[0_8px_22px_rgba(14,165,164,0.40)] hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              aria-label="Generate short URL"
              tabIndex={0}
            >
              {isLoading ? 'Generating...' : 'Generate URL'}
            </button>
          </form>

          {/* Generated URL Section */}
          {generatedUrl && (
            <div className="mt-8 space-y-4">
              {/* Generated URL with Copy */}
              <div className="bg-bg-primary-light dark:bg-bg-primary-dark border border-gray-200 rounded-lg p-6 shadow-sm">
                <label className="block text-sm font-medium dark:text-gray-300  mb-2">
                  Generated Short URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={generatedUrl}
                    readOnly
                    className="flex-1 h-12 px-4 border border-gray-300 rounded-lg text-base bg-bg-primary-light dark:bg-bg-primary-dark text-blue-500 outline-none"
                    aria-label="Generated short URL"
                  />
                  <button
                    type="button"
                    onClick={handleCopyToClipboard}
                    className={`h-12 px-6 flex items-center gap-2 border border-gray-300 cursor-pointer rounded-lg font-medium transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-teal-500 text-white hover:bg-teal-dark'
                    }`}
                    aria-label="Copy URL to clipboard"
                    tabIndex={0}
                  >
                    <FaCopy size={16} aria-hidden="true" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              {qrCodeBase64 && (
                <div className="bg-bg-primary-light dark:bg-bg-primary-dark border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-sm font-medium dark:text-gray-300 mb-4">
                    QR Code
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src={`data:image/png;base64,${qrCodeBase64}`}
                      alt="QR Code for short URL"
                      className="w-48 h-48 border border-gray-200 rounded-lg"
                      aria-label="QR Code for generated short URL"
                    />
                  </div>
                </div>
              )}

              {/* Expiry Information */}
              {expiryInfo && (
                <div className="bg-blue-50 dark:bg-bg-primary-dark border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Link Expiry Information
                  </h3>
                  <p className="text-base text-blue-800">
                    This link will expire on{' '}
                    <span className="font-semibold">{expiryInfo.date}</span> at{' '}
                    <span className="font-semibold">{expiryInfo.time}</span>
                  </p>
                </div>
              )}

              {!expiryInfo && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <p className="text-base text-gray-600">
                    This link has no expiration date and will remain active indefinitely.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default UrlGeneratorPage;

