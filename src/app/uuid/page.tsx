'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw, Trash2 } from 'lucide-react';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateUuids = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < quantity; i++) {
      const uuid = crypto.randomUUID();
      newUuids.push(uppercase ? uuid.toUpperCase() : uuid);
    }
    setUuids(newUuids);
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearAll = () => {
    setUuids([]);
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">UUID Generator</h1>
      <p className="text-gray-400 mb-8">
        Generate random UUIDs (v4) instantly in your browser. Perfect for database IDs, unique identifiers, and testing.
      </p>

      {/* Controls */}
      <div className="mb-6 bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quantity
            </label>
            <div className="flex gap-2">
              {[1, 5, 10, 25, 50, 100].map((num) => (
                <button
                  key={num}
                  onClick={() => setQuantity(num)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    quantity === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Options
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
              />
              Uppercase
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={generateUuids}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Generate {quantity > 1 ? `${quantity} UUIDs` : 'UUID'}
          </button>
          {uuids.length > 0 && (
            <>
              <button
                onClick={copyAllToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied All!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy All
                  </>
                )}
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">
              Generated UUIDs ({uuids.length})
            </h2>
            <span className="text-xs text-gray-500">
              Click any UUID to copy
            </span>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg divide-y divide-gray-800 max-h-96 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-800 transition-colors group"
              >
                <code className="font-mono text-sm text-gray-300 flex-1">
                  {uuid}
                </code>
                <button
                  onClick={() => copyToClipboard(uuid, index)}
                  className="ml-4 text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {uuids.length === 0 && (
        <div className="mb-12 p-12 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
          <RefreshCw className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500">
            Click "Generate" to create UUIDs
          </p>
        </div>
      )}

      {/* SEO Content */}
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            What is a UUID?
          </h2>
          <p className="mb-4">
            A UUID (Universally Unique Identifier), also known as a GUID (Globally Unique Identifier),
            is a 128-bit number used to uniquely identify information in computer systems. UUIDs are
            standardized by the Open Software Foundation (OSF) as part of the Distributed Computing
            Environment (DCE).
          </p>
          <p>
            Our UUID generator creates Version 4 UUIDs using the browser's built-in <code className="px-1 py-0.5 bg-gray-800 rounded">crypto.randomUUID()</code> function,
            which generates cryptographically strong random values. The format is: <code className="px-1 py-0.5 bg-gray-800 rounded">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Why Use UUIDs?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Global Uniqueness:</strong> No central coordination needed - generate IDs anywhere</li>
            <li><strong>Collision-Resistant:</strong> Virtually impossible to generate duplicates (1 in 2¹²² chance)</li>
            <li><strong>Privacy-Friendly:</strong> Don't reveal creation time or device info (unlike v1 UUIDs)</li>
            <li><strong>Database-Friendly:</strong> Perfect for distributed systems and primary keys</li>
            <li><strong>Non-Sequential:</strong> Can't be guessed or enumerated like auto-increment IDs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Common Use Cases
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Database Primary Keys</h3>
              <p className="text-sm">
                Use as unique identifiers in databases, especially in distributed systems where
                auto-increment IDs don't work well.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">API Resources</h3>
              <p className="text-sm">
                Generate unique IDs for API resources, preventing enumeration attacks and hiding
                the number of records.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Session IDs</h3>
              <p className="text-sm">
                Create secure, unpredictable session identifiers for authentication systems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">File Names</h3>
              <p className="text-sm">
                Generate unique file names for uploads to prevent collisions and overwriting.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Testing & Mocking</h3>
              <p className="text-sm">
                Create realistic test data with unique identifiers for unit tests and mock APIs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Message Queues</h3>
              <p className="text-sm">
                Track messages across distributed systems with guaranteed unique identifiers.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            UUID Format Explained
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="font-mono text-blue-400 mb-4 text-center text-lg">
              550e8400-e29b-41d4-a716-446655440000
            </p>
            <div className="grid md:grid-cols-5 gap-2 text-xs">
              <div className="text-center">
                <div className="font-mono text-gray-500 mb-1">550e8400</div>
                <div className="text-gray-400">Time Low<br/>(8 hex digits)</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-gray-500 mb-1">e29b</div>
                <div className="text-gray-400">Time Mid<br/>(4 hex digits)</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-gray-500 mb-1">41d4</div>
                <div className="text-gray-400">Version + Time Hi<br/>(4 hex digits)</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-gray-500 mb-1">a716</div>
                <div className="text-gray-400">Variant + Clock<br/>(4 hex digits)</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-gray-500 mb-1">446655440000</div>
                <div className="text-gray-400">Node<br/>(12 hex digits)</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Version 4 UUIDs use random data for all sections except the version (4) and variant bits.
            </p>
          </div>
        </section>

        <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            How It Works
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Select how many UUIDs you need (1-100)</li>
            <li>Optionally choose uppercase format</li>
            <li>Click "Generate" to create UUIDs using <code className="px-1 py-0.5 bg-gray-800 rounded">crypto.randomUUID()</code></li>
            <li>Click any UUID to copy it individually, or use "Copy All" for bulk copying</li>
          </ol>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Privacy Note:</strong> All UUIDs are generated entirely in your browser using
            the Web Crypto API. No server calls, no tracking, completely private.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            UUID vs GUID: What's the Difference?
          </h2>
          <p>
            There is no practical difference. "UUID" is the standard term used in most contexts,
            while "GUID" is Microsoft's term for the same concept. They both refer to the same
            128-bit unique identifiers and are fully interchangeable.
          </p>
        </section>
      </div>
    </div>
  );
}
