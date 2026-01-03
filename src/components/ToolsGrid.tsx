import Link from 'next/link';
import { FileJson, Lock, Fingerprint, Camera, Package } from 'lucide-react';

export default function ToolsGrid() {
  return (
    <div className="my-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">All Tools</h2>
        <p className="text-gray-400">Privacy-first developer utilities that run entirely in your browser</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Diff Checker */}
        <Link href="/" className="group">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Diff Checker</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Compare text and code differences side-by-side with syntax highlighting. Perfect for code reviews and file comparisons.
            </p>
          </div>
        </Link>

        {/* JSON Formatter */}
        <Link href="/json-formatter" className="group">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                <FileJson className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">JSON Formatter</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Format, validate, and beautify JSON data instantly. Minify or prettify with proper indentation.
            </p>
          </div>
        </Link>

        {/* Base64 Encoder */}
        <Link href="/base64" className="group">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Base64 Encoder</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Encode and decode Base64 strings securely in your browser. No server uploads required.
            </p>
          </div>
        </Link>

        {/* UUID Generator */}
        <Link href="/uuid" className="group">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                <Fingerprint className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">UUID Generator</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Generate UUID v4 identifiers instantly. Bulk generation supported for database seeding and testing.
            </p>
          </div>
        </Link>

        {/* Code Screenshot */}
        <Link href="/code-screenshot" className="group">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Code Screenshot</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Create beautiful code screenshots with syntax highlighting and customizable themes for documentation.
            </p>
          </div>
        </Link>

        {/* Package Size */}
        <Link href="/package-size" className="group">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Package Size</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Check npm package bundle sizes and analyze dependencies before adding them to your project.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
