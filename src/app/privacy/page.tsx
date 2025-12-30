export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">The Short Version</h2>
          <p className="text-lg font-medium text-blue-400">
            We don't collect, store, or transmit your data. Period.
          </p>
          <p className="mt-2">
            DiffZero processes all comparisons entirely in your browser. Your text, code, and files never leave your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">What We DON'T Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your diff content (text, code, JSON, etc.)</li>
            <li>File names or metadata</li>
            <li>IP addresses or personal identifiers</li>
            <li>Cookies for tracking purposes</li>
            <li>Any data that could identify you or your work</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">How DiffZero Works</h2>
          <p>
            DiffZero is a client-side application built with Next.js. When you paste text into the editor:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>The diff algorithm runs locally in your browser using JavaScript</li>
            <li>Results are displayed instantly without any network requests</li>
            <li>When you close the tab, all data is immediately discarded</li>
          </ol>
          <p className="mt-4 text-sm text-gray-400">
            <strong>Technical Note:</strong> You can verify this by opening your browser's Network tab (F12) - you'll see zero outbound requests containing your content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">Analytics (Optional)</h2>
          <p>
            We may use privacy-respecting analytics (like Plausible or Fathom) to understand:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Page views and basic usage statistics</li>
            <li>Referral sources (how you found us)</li>
            <li>Browser type and screen size (for compatibility)</li>
          </ul>
          <p className="mt-2 text-sm text-gray-400">
            These tools do NOT track you across websites and do NOT collect personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">Third-Party Services</h2>
          <p>
            DiffZero may display ads via Google AdSense. Google may use cookies for ad personalization. You can opt out of personalized advertising at{' '}
            <a href="https://www.google.com/settings/ads" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">Your Rights</h2>
          <p>
            Since we don't collect your data, there's nothing to delete, export, or request. You are in complete control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">Changes to This Policy</h2>
          <p>
            If we ever change how DiffZero handles data (we won't), we'll update this page and notify users prominently.
          </p>
        </section>

        <section className="border-t border-gray-800 pt-6 mt-8">
          <p className="text-sm text-gray-500">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Questions? Contact us at privacy@diffzero.dev
          </p>
        </section>
      </div>
    </div>
  );
}
