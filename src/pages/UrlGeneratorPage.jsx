import React, { useState } from 'react';
import { Footer } from '../components/layout';
import { botrixLogo } from '../constants/images';
import { FaCopy, FaHistory } from 'react-icons/fa';

const UrlGeneratorPage = () => {
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

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!formData.longLink) {
      setError('Please enter a long link');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare request body
      const requestBody = {
        url: formData.longLink,
      };

      // Add custom code if provided
      if (formData.customCode.trim()) {
        requestBody.customCode = formData.customCode.trim();
      }

      // Calculate expiry days if date is provided
      const expiryDays = calculateExpiryDays(formData.expiryDate);
      if (expiryDays !== null && expiryDays > 0) {
        requestBody.expiryDays = expiryDays;
      }

      // Make API call
      const response = await fetch('http://localhost:8081/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        let errorMessage = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          // Use the message from the API response if available
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          // If JSON parsing fails, use the default error message
          console.error('Failed to parse error response:', parseError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Set generated URL
      setGeneratedUrl(data.shortUrl);

      // Set QR code
      if (data.qrCodeBase64) {
        setQrCodeBase64(data.qrCodeBase64);
      }

      // Set expiry info
      if (data.expiryDate) {
        const expiryDate = new Date(data.expiryDate);
        setExpiryInfo({
          date: expiryDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          time: expiryDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          rawDate: data.expiryDate,
        });
      } else {
        setExpiryInfo(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to generate short URL. Please try again.');
      setGeneratedUrl('');
      setQrCodeBase64('');
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
    // Will implement history page later
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={botrixLogo}
                alt="BotrixAI Logo"
                className="h-18 w-auto"
                aria-hidden="true"
              />
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
              <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center text-white font-semibold">
                M
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            <span className="text-teal">Short URL</span>{' '}
            <span className="text-gray-800">Generator</span>
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
                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base outline-none bg-white text-gray-900 placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
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
                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base outline-none bg-white text-gray-900 placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
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
                className="w-full h-14 px-4 border border-gray-300 rounded-lg text-base outline-none bg-white text-gray-900 focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
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
              className={`w-full h-14 bg-teal text-white font-semibold text-lg rounded-lg border-none cursor-pointer shadow-[0_6px_18px_rgba(14,165,164,0.35)] transition-all hover:bg-teal-dark hover:shadow-[0_8px_22px_rgba(14,165,164,0.40)] hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 ${
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
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generated Short URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={generatedUrl}
                    readOnly
                    className="flex-1 h-12 px-4 border border-gray-300 rounded-lg text-base bg-gray-50 text-gray-700 outline-none"
                    aria-label="Generated short URL"
                  />
                  <button
                    type="button"
                    onClick={handleCopyToClipboard}
                    className={`h-12 px-6 flex items-center gap-2 rounded-lg font-medium transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-teal text-white hover:bg-teal-dark'
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
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
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
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
      <Footer />
    </>
  );
};

export default UrlGeneratorPage;

