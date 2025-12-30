'use client';

import { Change } from 'diff';

interface DiffResultsProps {
  diffs: Change[];
}

export default function DiffResults({ diffs }: DiffResultsProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#121214] overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 bg-[#18181b] flex justify-between items-center">
        <h2 className="font-semibold text-sm">Diff Result</h2>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div> Removed
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div> Added
          </span>
        </div>
      </div>
      <div className="overflow-x-auto p-0">
        {diffs.length === 0 ? (
          <div className="p-12 text-center text-gray-600 text-sm">
            Paste text above to see differences.
          </div>
        ) : (
          <pre className="font-mono text-sm leading-6">
            {diffs.map((part, index) => {
              const color = part.added
                ? 'bg-green-900/20 text-green-400'
                : part.removed
                ? 'bg-red-900/20 text-red-400'
                : 'text-gray-500';
              const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
              const borderColor = part.added
                ? 'border-green-500'
                : part.removed
                ? 'border-red-500'
                : 'border-transparent';

              return (
                <div
                  key={index}
                  className={`${color} px-4 w-full border-l-2 ${borderColor}`}
                >
                  <span className="select-none opacity-50 mr-2 w-4 inline-block">
                    {prefix}
                  </span>
                  <span>{part.value}</span>
                </div>
              );
            })}
          </pre>
        )}
      </div>
    </div>
  );
}
