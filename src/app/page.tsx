'use client';

import React, { useState, useEffect } from 'react';
import { diffLines, Change } from 'diff';
import TextInputArea from '@/components/diff/TextInputArea';
import DiffResults from '@/components/diff/DiffResults';

export default function DiffChecker() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffs, setDiffs] = useState<Change[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!original && !modified) {
      setDiffs([]);
      return;
    }
    const results = diffLines(original, modified);
    setDiffs(results);
  }, [original, modified]);

  const handleCopy = () => {
    navigator.clipboard.writeText(modified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 h-[400px]">
        <TextInputArea
          label="Original Text"
          value={original}
          onChange={setOriginal}
          onClear={() => setOriginal('')}
          placeholder="Paste original text..."
        />
        <TextInputArea
          label="Modified Text"
          value={modified}
          onChange={setModified}
          onClear={() => setModified('')}
          placeholder="Paste modified text..."
          showCopy
          onCopy={handleCopy}
          copied={copied}
        />
      </div>

      {/* Results */}
      <DiffResults diffs={diffs} />

      {/* SEO Content Section - Page Specific */}
      <div className="mt-12 border-t border-gray-800 pt-8">
        <article className="prose prose-invert prose-sm md:prose-base text-gray-400">
          <h2 className="text-gray-200 font-bold text-2xl mb-4">Why Choose a Secure Diff Checker for Your Development Workflow?</h2>
          <p className="mb-4">
            When you need to <strong>compare text online</strong> or analyze code differences, most tools require uploading your files to a remote server. For developers handling proprietary code, API keys, or sensitive configurations, this creates unacceptable security risks. DiffZero solves this with a <strong>client-side diff</strong> engine that processes everything locally in your browser.
          </p>

          <h3 className="text-gray-200 font-bold text-xl mt-8 mb-3">Privacy-First Code Comparison</h3>
          <p className="mb-4">
            Unlike traditional diff tools, DiffZero is a <strong>secure diff checker</strong> that never transmits your data. Whether you're comparing database schemas, reviewing pull requests, or debugging configuration files, your intellectual property stays on your device. This makes it ideal for:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Comparing production environment variables without security team approval</li>
            <li>Reviewing contracts or legal documents with client-side encryption</li>
            <li>Analyzing logs containing PII (Personally Identifiable Information)</li>
            <li>Working offline during flights or in air-gapped networks</li>
          </ul>

          <h3 className="text-gray-200 font-bold text-xl mt-8 mb-3">Instant JSON Difference Tool for Modern Developers</h3>
          <p className="mb-4">
            Need to spot changes in API responses or configuration files? Our <strong>JSON difference tool</strong> highlights structural changes with syntax-aware formatting. The <strong>offline code compare</strong> functionality works without internet connectivity, making it perfect for DevOps engineers, security researchers, and data analysts who value speed and privacy.
          </p>

          <h3 className="text-gray-200 font-bold text-xl mt-8 mb-3">How It Works</h3>
          <p className="mb-4">
            Simply paste your original and modified text into the split-pane editor. The diff algorithm runs entirely in your browser using WebAssembly, delivering results in milliseconds. Support for text, JSON, XML, SQL, and all major programming languages ensures you can <strong>compare text online</strong> without switching tools or compromising security.
          </p>

          <p className="text-sm text-gray-500 mt-8 italic">
            Trusted by developers at privacy-conscious organizations who refuse to paste sensitive code into ChatGPT or server-based tools.
          </p>
        </article>
      </div>
    </>
  );
}