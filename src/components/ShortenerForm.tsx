"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct Import

const ShortenerForm = () => {
  const [url, setUrl] = useState("");
  const [expiry, setExpiry] = useState("86400"); // Default: 1 day
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      const response = await axios.post("/api/shorten", { originalUrl: url, expiry: Number(expiry) });
      setShortUrl(response.data.shortUrl);
      toast.success("URL Shortened Successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      
      <select
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="86400">1 Day</option>
        <option value="604800">7 Days</option>
        <option value="2592000">30 Days</option>
      </select>

      <button
        onClick={handleShorten}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <div className="mt-4">
          <p className="text-lg">Shortened URL:</p>
          <a href={shortUrl} target="_blank" className="text-blue-500 underline">
            {shortUrl}
          </a>

          {/* ✅ QR Code Display */}
          <div className="mt-4 flex justify-center">
            <QRCodeCanvas value={shortUrl} size={150} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
