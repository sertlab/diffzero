'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import Prism from 'prismjs';
import ToolsGrid from '@/components/ToolsGrid';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';

const THEMES = {
  dracula: {
    name: 'Dracula',
    background: 'linear-gradient(135deg, #282a36 0%, #44475a 100%)',
    codeBackground: '#282a36',
    text: '#f8f8f2',
  },
  nord: {
    name: 'Nord',
    background: 'linear-gradient(135deg, #2e3440 0%, #3b4252 100%)',
    codeBackground: '#2e3440',
    text: '#eceff4',
  },
  github: {
    name: 'GitHub',
    background: 'linear-gradient(135deg, #ffffff 0%, #f6f8fa 100%)',
    codeBackground: '#ffffff',
    text: '#24292e',
  },
  monokai: {
    name: 'Monokai',
    background: 'linear-gradient(135deg, #272822 0%, #3e3d32 100%)',
    codeBackground: '#272822',
    text: '#f8f8f2',
  },
  ocean: {
    name: 'Ocean',
    background: 'linear-gradient(135deg, #1b2b34 0%, #343d46 100%)',
    codeBackground: '#1b2b34',
    text: '#c0c5ce',
  },
};

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'jsx', label: 'React (JSX)' },
  { value: 'tsx', label: 'React (TSX)' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'bash', label: 'Bash' },
  { value: 'sql', label: 'SQL' },
];

export default function CodeScreenshot() {
  const [code, setCode] = useState(`function hello(name) {\n  console.log(\`Hello, \${name}!\`);\n  return true;\n}`);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState<keyof typeof THEMES>('dracula');
  const [padding, setPadding] = useState(64);
  const [showWindowButtons, setShowWindowButtons] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.javascript,
    language
  );

  const exportToPng = async () => {
    if (!previewRef.current) return;

    try {
      setExporting(true);
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `code-screenshot-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export:', err);
    } finally {
      setExporting(false);
    }
  };

  const copyToClipboard = async () => {
    if (!previewRef.current) return;

    try {
      const blob = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
      }).then((dataUrl) => {
        return fetch(dataUrl).then((res) => res.blob());
      });

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Code Screenshot Generator</h1>
      <p className="text-gray-400 mb-8">
        Create beautiful code screenshots for Twitter, LinkedIn, and blog posts. Privacy-first - your code never leaves your browser.
      </p>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Controls */}
        <div className="space-y-6">
          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 bg-gray-900 border border-gray-800 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Paste your code here..."
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key as keyof typeof THEMES)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Padding */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Padding: {padding}px
            </label>
            <input
              type="range"
              min="32"
              max="128"
              step="8"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showWindowButtons}
                onChange={(e) => setShowWindowButtons(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
              />
              Show window buttons
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => setShowLineNumbers(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
              />
              Show line numbers
            </label>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3">
            <button
              onClick={exportToPng}
              disabled={exporting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Exporting...' : 'Download PNG'}
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Preview
          </label>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-auto">
            <div
              ref={previewRef}
              style={{
                background: THEMES[theme].background,
                padding: `${padding}px`,
                borderRadius: '12px',
                display: 'inline-block',
                minWidth: '100%',
              }}
            >
              {showWindowButtons && (
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              )}
              <div
                style={{
                  background: THEMES[theme].codeBackground,
                  padding: '24px',
                  borderRadius: '8px',
                  color: THEMES[theme].text,
                }}
              >
                <pre className="font-mono text-sm overflow-x-auto flex">
                  {showLineNumbers && (
                    <code className="text-gray-600 select-none mr-4 text-right" style={{ minWidth: '2em' }}>
                      {code.split('\n').map((_, i) => (
                        <div key={i} style={{ lineHeight: '1.5' }}>{i + 1}</div>
                      ))}
                    </code>
                  )}
                  <code
                    className="language-javascript flex-1"
                    style={{ lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <ToolsGrid />

      {/* SEO Content */}
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Create Beautiful Code Screenshots in Seconds
          </h2>
          <p className="mb-4">
            Stop taking ugly screenshots of your code editor. Generate beautiful, professional-looking
            code images perfect for Twitter, LinkedIn, Medium, and documentation. Completely free and
            privacy-first - your code never leaves your browser.
          </p>
          <p>
            Unlike other code screenshot tools, DiffZero processes everything locally using JavaScript.
            No uploads, no tracking, no data collection. Your proprietary code stays on your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Syntax Highlighting</h3>
              <p className="text-sm">
                Support for 12+ languages including JavaScript, TypeScript, Python, Rust, Go, and more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Beautiful Themes</h3>
              <p className="text-sm">
                Choose from popular themes: Dracula, Nord, GitHub Light, Monokai, and Ocean.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Customizable</h3>
              <p className="text-sm">
                Adjust padding, toggle window buttons, show/hide line numbers, perfect for your style.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">High Quality Export</h3>
              <p className="text-sm">
                Export as 2x resolution PNG for crisp images on retina displays and social media.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Copy to Clipboard</h3>
              <p className="text-sm">
                One-click copy image directly to clipboard for instant pasting into tweets and posts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">100% Private</h3>
              <p className="text-sm">
                All processing happens in your browser. No servers, no uploads, no data collection.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Why Use a Privacy-First Code Screenshot Tool?
          </h2>
          <p className="mb-4">
            Popular code screenshot tools like Carbon.now.sh are great, but they upload your code to
            their servers for processing. If you're working with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Proprietary company code</li>
            <li>API keys or credentials (even in comments)</li>
            <li>Unreleased features</li>
            <li>Security-sensitive implementations</li>
          </ul>
          <p className="mt-4">
            ...you shouldn't risk uploading it to third-party services. DiffZero's code screenshot
            generator runs entirely in your browser using client-side JavaScript and Canvas APIs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Perfect For
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Twitter/X:</strong> Share code snippets in tweets with beautiful formatting</li>
            <li><strong>LinkedIn:</strong> Professional code examples for technical posts</li>
            <li><strong>Medium/Dev.to:</strong> Eye-catching code blocks for blog posts</li>
            <li><strong>Documentation:</strong> Clean code examples for READMEs and wikis</li>
            <li><strong>Presentations:</strong> High-quality code slides for talks and workshops</li>
            <li><strong>Portfolios:</strong> Showcase your code with style</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            How to Use
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Paste your code into the editor</li>
            <li>Select the programming language for proper syntax highlighting</li>
            <li>Choose a theme that matches your style</li>
            <li>Adjust padding and display options</li>
            <li>Click "Download PNG" or "Copy" to clipboard</li>
            <li>Share on social media or embed in documentation</li>
          </ol>
        </section>

        <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            How It Works
          </h2>
          <p className="mb-4">
            Our code screenshot generator uses:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Prism.js:</strong> Industry-standard syntax highlighting library</li>
            <li><strong>HTML Canvas API:</strong> Converts styled HTML to high-quality PNG images</li>
            <li><strong>Client-side processing:</strong> Everything runs in your browser via JavaScript</li>
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Privacy guarantee:</strong> Open Developer Tools (F12) → Network tab and watch -
            zero requests are made when you generate screenshots. Your code stays on your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-1">What languages are supported?</h3>
              <p className="text-sm">
                JavaScript, TypeScript, React (JSX/TSX), Python, Java, Go, Rust, CSS, JSON, Bash, and SQL.
                More languages coming soon!
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Can I use this for commercial projects?</h3>
              <p className="text-sm">
                Yes! The tool is completely free for personal and commercial use. Generate unlimited screenshots.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Why is this better than Carbon.now.sh?</h3>
              <p className="text-sm">
                Carbon is excellent, but it uploads your code to their servers. If you're working with proprietary
                or sensitive code, DiffZero keeps everything private by processing locally in your browser.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
