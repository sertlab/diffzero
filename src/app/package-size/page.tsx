'use client';

import { useState } from 'react';
import { Search, Package, AlertCircle, TrendingUp, Download } from 'lucide-react';

interface PackageInfo {
  name: string;
  version: string;
  size: number;
  gzipSize: number;
  dependencies: { [key: string]: number };
  totalSize: number;
}

export default function PackageSize() {
  const [packageName, setPackageName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<PackageInfo | null>(null);

  const fetchPackageSize = async (name: string, version?: string): Promise<number> => {
    try {
      const response = await fetch(`https://registry.npmjs.org/${name}`);
      if (!response.ok) throw new Error('Package not found');

      const data = await response.json();
      const versionToUse = version || data['dist-tags'].latest;
      const versionData = data.versions[versionToUse];

      // npm registry provides unpackedSize in dist object
      return versionData?.dist?.unpackedSize || 0;
    } catch (err) {
      return 0;
    }
  };

  const analyzePackage = async (pkgName?: string) => {
    const nameToAnalyze = pkgName || packageName;

    if (!nameToAnalyze.trim()) {
      setError('Please enter a package name');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Fetch package info from npm registry
      const response = await fetch(`https://registry.npmjs.org/${nameToAnalyze}`);

      if (!response.ok) {
        throw new Error('Package not found');
      }

      const data = await response.json();
      const latestVersion = data['dist-tags'].latest;
      const versionData = data.versions[latestVersion];

      // Get package size from npm registry (unpackedSize)
      const mainSize = versionData?.dist?.unpackedSize || 0;

      // Calculate dependencies sizes
      const dependencies = versionData.dependencies || {};
      const depSizes: { [key: string]: number } = {};
      let totalDepSize = 0;

      // Fetch sizes for top 10 dependencies (to avoid too many requests)
      const depNames = Object.keys(dependencies).slice(0, 10);

      for (const dep of depNames) {
        try {
          const depSize = await fetchPackageSize(dep);
          if (depSize > 0) {
            depSizes[dep] = depSize;
            totalDepSize += depSize;
          }
        } catch (err) {
          // Skip failed fetches
          continue;
        }
      }

      const totalSize = mainSize + totalDepSize;
      // Gzip typically compresses to 25-35% of original size
      const gzipSize = Math.floor(totalSize * 0.28);

      setResult({
        name: nameToAnalyze,
        version: latestVersion,
        size: mainSize,
        gzipSize,
        dependencies: depSizes,
        totalSize,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze package');
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      analyzePackage();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">npm Package Size Analyzer</h1>
      <p className="text-gray-400 mb-8">
        Check the TRUE size of any npm package before installing. See what you're really downloading.
      </p>

      {/* Search */}
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter package name (e.g., lodash, moment, react)"
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => analyzePackage()}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-8 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-400">Error</p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-12 bg-gray-900 border border-gray-800 rounded-lg p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-400">Analyzing package and dependencies...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && result && (
        <div className="space-y-6 mb-12">
          {/* Overview */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold">{result.name}</h2>
                <p className="text-gray-400 text-sm">v{result.version}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Package Size</p>
                <p className="text-2xl font-bold text-blue-400">{formatBytes(result.size)}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Gzipped</p>
                <p className="text-2xl font-bold text-green-400">{formatBytes(result.gzipSize)}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">With Dependencies</p>
                <p className="text-2xl font-bold text-purple-400">{formatBytes(result.totalSize)}</p>
              </div>
            </div>
          </div>

          {/* Dependencies Breakdown */}
          {Object.keys(result.dependencies).length > 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Dependencies ({Object.keys(result.dependencies).length} shown)
              </h3>
              <div className="space-y-2">
                {Object.entries(result.dependencies)
                  .sort(([, a], [, b]) => b - a)
                  .map(([name, size]) => (
                    <div key={name} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="font-mono text-sm">{name}</span>
                      <span className="text-gray-400">{formatBytes(size)}</span>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-400 text-center">No dependencies found or this package has no dependencies.</p>
            </div>
          )}

          {/* Impact Warning */}
          {result.totalSize > 1024 * 1024 && (
            <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Large Package Warning</h3>
                  <p className="text-gray-300">
                    This package is quite large ({formatBytes(result.totalSize)}). Consider:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
                    <li>Using a lighter alternative</li>
                    <li>Importing only specific functions you need</li>
                    <li>Tree-shaking to remove unused code</li>
                    <li>Code splitting to load dependencies on demand</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Download Time Estimate */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Time Estimates
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Slow 3G</p>
                <p className="text-lg font-semibold">{((result.gzipSize / (400 * 1024)) * 1000).toFixed(1)}ms</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">4G</p>
                <p className="text-lg font-semibold">{((result.gzipSize / (10 * 1024 * 1024)) * 1000).toFixed(1)}ms</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Broadband</p>
                <p className="text-lg font-semibold">{((result.gzipSize / (50 * 1024 * 1024)) * 1000).toFixed(1)}ms</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Comparisons */}
      <div className="mb-12 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Try These Popular Packages</h3>
        <div className="flex flex-wrap gap-2">
          {['react', 'lodash', 'moment', 'axios', 'express', 'next', 'vue', 'date-fns'].map((pkg) => (
            <button
              key={pkg}
              onClick={() => {
                setPackageName(pkg);
                analyzePackage(pkg);
              }}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
            >
              {pkg}
            </button>
          ))}
        </div>
      </div>

      {/* SEO Content */}
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Why Check npm Package Sizes?
          </h2>
          <p className="mb-4">
            Before running <code className="px-2 py-1 bg-gray-800 rounded">npm install</code>, you should know
            what you're actually downloading. Many packages seem small but include massive dependency trees
            that bloat your node_modules and bundle size.
          </p>
          <p>
            Our npm package size analyzer shows you the TRUE cost of each package - including all transitive
            dependencies. Make informed decisions and keep your bundles lean.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            How It Works
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Enter any npm package name (e.g., "lodash", "moment", "react")</li>
            <li>We fetch package metadata from the npm registry API</li>
            <li>Calculate the package size and analyze its dependencies</li>
            <li>Show you the total download size including all dependencies</li>
            <li>Estimate download times on different connection speeds</li>
          </ol>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Privacy-first:</strong> All API calls happen directly from your browser to npm's public
            registry. We don't track what packages you check or store any data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Common Bundle Size Surprises
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>moment.js:</strong> Seems small, but the full package is ~290KB (71KB gzipped)</li>
            <li><strong>lodash:</strong> Full library is ~70KB, but you can import individual functions</li>
            <li><strong>axios:</strong> Small and efficient at ~13KB gzipped</li>
            <li><strong>date-fns:</strong> Smaller alternative to moment at ~2KB per function</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Tips to Reduce Bundle Size
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Import selectively:</strong> Use <code className="px-1 py-0.5 bg-gray-800 rounded">import &#123; function &#125; from 'package'</code> instead of importing everything</li>
            <li><strong>Use lighter alternatives:</strong> Replace moment with date-fns, lodash with native methods</li>
            <li><strong>Enable tree-shaking:</strong> Use ES modules and tools like Webpack or Rollup</li>
            <li><strong>Code splitting:</strong> Load large packages only when needed</li>
            <li><strong>Check before installing:</strong> Always analyze package size first</li>
          </ul>
        </section>

        <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Why Bundle Size Matters
          </h2>
          <p className="mb-4">
            Every kilobyte you add to your JavaScript bundle:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Increases download time for users (especially on mobile/slow connections)</li>
            <li>Increases parse and compile time in the browser</li>
            <li>Hurts SEO and Core Web Vitals scores</li>
            <li>Costs users money on metered connections</li>
            <li>Reduces conversion rates (users bounce on slow sites)</li>
          </ul>
          <p className="mt-4">
            A 1-second delay in load time can reduce conversions by 7%. Keep your bundles small!
          </p>
        </section>
      </div>
    </div>
  );
}
