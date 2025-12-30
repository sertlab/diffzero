'use client';

import Link from 'next/link';
import { Terminal, ShieldCheck, Github } from 'lucide-react';

export default function Navbar() {
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
        </div>

        {/* Trust Badge */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex text-xs px-2 py-0.5 rounded-full border bg-green-900/30 border-green-800 text-green-400 items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Client-Side Only
          </span>
          {/* Add your GitHub link here later if you want to open source it */}
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}