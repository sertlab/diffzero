'use client';

import { Trash2, Copy, Check } from 'lucide-react';

interface TextInputAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  showCopy?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}

export default function TextInputArea({
  label,
  value,
  onChange,
  onClear,
  placeholder,
  showCopy = false,
  onCopy,
  copied = false,
}: TextInputAreaProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        <div className="flex gap-3">
          <button
            onClick={onClear}
            className="text-xs flex items-center gap-1 text-gray-500 hover:text-red-400"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
          {showCopy && onCopy && (
            <button
              onClick={onCopy}
              className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy
            </button>
          )}
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full p-4 font-mono text-sm bg-[#121214] border border-gray-800 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none text-gray-300"
        spellCheck={false}
      />
    </div>
  );
}
