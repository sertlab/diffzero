'use client';

import { useState } from 'react';
import { AlertCircle, Copy, Check, Upload, X } from 'lucide-react';
import ToolsGrid from '@/components/ToolsGrid';

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleEncode = () => {
    try {
      setError('');
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (err) {
      setError('Failed to encode. Make sure your text contains only valid characters.');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setError('');
      const decoded = atob(input);
      setOutput(decoded);
    } catch (err) {
      setError('Invalid Base64 string. Please check your input.');
      setOutput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const base64 = event.target?.result as string;
        // Remove the data URL prefix (data:image/png;base64,...)
        const base64Data = base64.split(',')[1] || base64;
        setOutput(base64Data);
        setInput(`File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
        setError('');
      } catch (err) {
        setError('Failed to read file');
      }
    };

    reader.onerror = () => {
      setError('Failed to read file');
    };

    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setFileName('');
    setInput('');
    setOutput('');
    setError('');
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const processInput = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
    clearFile();
  };

  const switchMode = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
    clearFile();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Base64 Encoder & Decoder</h1>
      <p className="text-gray-400 mb-8">
        Encode text or files to Base64, or decode Base64 strings back to text. All processing happens locally in your browser.
      </p>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => switchMode('encode')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            mode === 'encode'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => switchMode('decode')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            mode === 'decode'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Decode
        </button>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <button
          onClick={processInput}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>

        {/* File Upload (Encode mode only) */}
        {mode === 'encode' && (
          <div className="ml-auto">
            <label
              htmlFor="fileInput"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload File
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* File Name Display */}
      {fileName && (
        <div className="mb-4 p-3 bg-purple-900/20 border border-purple-800 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">File: {fileName}</span>
          </div>
          <button
            onClick={clearFile}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-400">Error</p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Input/Output Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </label>
            <span className="text-xs text-gray-500">{input.length} characters</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            className="w-full h-96 p-4 bg-gray-900 border border-gray-800 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            disabled={!!fileName}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
          <div className="w-full h-96 p-4 bg-gray-900 border border-gray-800 rounded-lg font-mono text-sm overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap break-all">{output}</pre>
            ) : (
              <p className="text-gray-600">
                {mode === 'encode' ? 'Encoded Base64 will appear here...' : 'Decoded text will appear here...'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <ToolsGrid />

      {/* SEO Content */}
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            What is Base64 Encoding?
          </h2>
          <p className="mb-4">
            Base64 is a binary-to-text encoding scheme that converts binary data into ASCII text format.
            It's commonly used to encode images, files, and binary data for transmission over text-based
            protocols like email, JSON APIs, and HTML/CSS.
          </p>
          <p>
            Our Base64 encoder/decoder runs entirely in your browser using JavaScript's built-in <code className="px-1 py-0.5 bg-gray-800 rounded">btoa()</code> and <code className="px-1 py-0.5 bg-gray-800 rounded">atob()</code> functions.
            Your data never leaves your device - no server uploads, no tracking, completely private.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Text Encoding</h3>
              <p className="text-sm">
                Convert plain text to Base64 format instantly using browser-native APIs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Text Decoding</h3>
              <p className="text-sm">
                Decode Base64 strings back to readable text with error detection.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">File Upload</h3>
              <p className="text-sm">
                Upload images, PDFs, or any file to encode them to Base64 data URLs locally.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">100% Private</h3>
              <p className="text-sm">
                All encoding/decoding happens in your browser. Files are read locally via FileReader API.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Embed images directly in HTML/CSS using data URLs</li>
            <li>Encode API credentials or tokens for HTTP headers</li>
            <li>Convert binary files to text for JSON APIs</li>
            <li>Decode Base64-encoded email attachments</li>
            <li>Debug Base64 strings in configuration files</li>
            <li>Prepare files for embedding in source code</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            How to Use
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Encoding Text:</h3>
              <ol className="list-decimal pl-6 space-y-1 text-sm">
                <li>Select "Encode" mode</li>
                <li>Paste your text in the input area</li>
                <li>Click "Encode"</li>
                <li>Copy the Base64 output</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Encoding Files:</h3>
              <ol className="list-decimal pl-6 space-y-1 text-sm">
                <li>Select "Encode" mode</li>
                <li>Click "Upload File" and choose any file</li>
                <li>The file is read locally and converted to Base64 automatically</li>
                <li>Copy the Base64 output to use in your code</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Decoding:</h3>
              <ol className="list-decimal pl-6 space-y-1 text-sm">
                <li>Select "Decode" mode</li>
                <li>Paste the Base64 string in the input area</li>
                <li>Click "Decode"</li>
                <li>View the decoded text in the output area</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Privacy & Security
          </h2>
          <p className="mb-4">
            This Base64 encoder/decoder is completely client-side. When you upload a file:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The file is read using the browser's FileReader API</li>
            <li>Conversion happens in your browser's memory</li>
            <li>No network requests are made</li>
            <li>The file never leaves your device</li>
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Verify yourself:</strong> Open Developer Tools (F12) → Network tab, then upload a file.
            You'll see zero outbound requests containing your data.
          </p>
        </section>
      </div>
    </div>
  );
}
