'use client';

import Link from 'next/link';
import { Terminal, ShieldCheck, Github, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800 bg-[#09090b] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo Area */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">DiffZero</span>
          </Link>

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Tools
              <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isToolsOpen && (
              <div
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
                className="absolute top-full left-0 mt-1 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden"
              >
                <Link
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors text-sm"
                  onClick={() => setIsToolsOpen(false)}
                >
                  Diff Checker
                </Link>
                <Link
                  href="/json-formatter"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors text-sm"
                  onClick={() => setIsToolsOpen(false)}
                >
                  JSON Formatter
                </Link>
                <Link
                  href="/base64"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors text-sm"
                  onClick={() => setIsToolsOpen(false)}
                >
                  Base64 Encoder
                </Link>
                <Link
                  href="/uuid"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors text-sm"
                  onClick={() => setIsToolsOpen(false)}
                >
                  UUID Generator
                </Link>
                <Link
                  href="/code-screenshot"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors text-sm"
                  onClick={() => setIsToolsOpen(false)}
                >
                  Code Screenshot
                </Link>
                <Link
                  href="/package-size"
                  className="block px-4 py-2 hover:bg-gray-800 transition-colors text-sm"
                  onClick={() => setIsToolsOpen(false)}
                >
                  Package Size
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex text-xs px-2 py-0.5 rounded-full border bg-green-900/30 border-green-800 text-green-400 items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Client-Side Only
          </span>
          <a
            href="https://github.com/sertlab/diffzero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}