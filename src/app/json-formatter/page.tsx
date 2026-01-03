'use client';

import { useState } from 'react';
import { AlertCircle, Copy, Check } from 'lucide-react';
import ToolsGrid from '@/components/ToolsGrid';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(
        sortKeys ? sortObjectKeys(parsed) : parsed,
        null,
        indentSize
      );
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(sortKeys ? sortObjectKeys(parsed) : parsed);
      setOutput(minified);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError('');
      setOutput('✓ Valid JSON');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const sortObjectKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((result: any, key) => {
          result[key] = sortObjectKeys(obj[key]);
          return result;
        }, {});
    }
    return obj;
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
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">JSON Formatter & Validator</h1>
      <p className="text-gray-400 mb-8">
        Format, validate, and minify JSON entirely in your browser. Your data never leaves your device.
      </p>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <button
          onClick={formatJson}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          Format/Prettify
        </button>
        <button
          onClick={minifyJson}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors"
        >
          Minify
        </button>
        <button
          onClick={validateJson}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
        >
          Validate
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
        >
          Clear
        </button>

        {/* Options */}
        <div className="flex items-center gap-4 ml-auto">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
            />
            Sort Keys
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span>Indent:</span>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-sm"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </label>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-400">Invalid JSON</p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Input/Output Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Input JSON</label>
            <span className="text-xs text-gray-500">{input.length} characters</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="w-full h-96 p-4 bg-gray-900 border border-gray-800 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Output</label>
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
              <p className="text-gray-600">Formatted JSON will appear here...</p>
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
            Why Use a Client-Side JSON Formatter?
          </h2>
          <p className="mb-4">
            Most online JSON formatters upload your data to their servers, exposing sensitive API responses,
            configuration files, and proprietary data. Our JSON formatter processes everything locally in your
            browser using JavaScript - nothing is ever transmitted over the network.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>100% Private:</strong> Your JSON never leaves your device</li>
            <li><strong>Instant Results:</strong> No server round-trips, just pure client-side processing</li>
            <li><strong>Works Offline:</strong> Format JSON even without an internet connection</li>
            <li><strong>Free Forever:</strong> No accounts, no limits, no tracking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Format & Prettify</h3>
              <p className="text-sm">
                Transform minified JSON into human-readable format with customizable indentation (2, 4, or 8 spaces).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Minify & Compress</h3>
              <p className="text-sm">
                Remove all whitespace to create the smallest possible JSON for production deployments.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Validate JSON</h3>
              <p className="text-sm">
                Quickly check if your JSON is valid and get precise error messages pointing to syntax issues.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Sort Keys</h3>
              <p className="text-sm">
                Alphabetically sort object keys for easier comparison and consistent formatting.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Common Use Cases
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Format API responses from curl or Postman</li>
            <li>Validate JSON configuration files (package.json, tsconfig.json, etc.)</li>
            <li>Minify JSON before deploying to production</li>
            <li>Debug malformed JSON from external APIs</li>
            <li>Compare JSON structures by sorting keys consistently</li>
          </ul>
        </section>

        <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            How It Works
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Paste your JSON into the input area</li>
            <li>Click Format, Minify, or Validate</li>
            <li>The JSON is processed entirely in your browser using JavaScript's native JSON.parse() and JSON.stringify()</li>
            <li>Results appear instantly in the output area</li>
            <li>Copy the formatted result or clear to start over</li>
          </ol>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Privacy Note:</strong> Open your browser's Network tab (F12) and you'll see zero network requests.
            Your data stays on your device.
          </p>
        </section>
      </div>
    </div>
  );
}
