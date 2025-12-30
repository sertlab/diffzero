export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using DiffZero ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">2. Description of Service</h2>
          <p>
            DiffZero is a free, client-side text comparison tool. The Service allows you to compare text, code, JSON, and other file formats entirely within your web browser without uploading data to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">3. Use of Service</h2>
          <p className="mb-2">You agree to use DiffZero only for lawful purposes. You may NOT:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service to compare stolen, illegal, or confidential information obtained without authorization</li>
            <li>Attempt to reverse engineer, decompile, or extract the source code</li>
            <li>Use automated tools (bots, scrapers) to abuse the Service</li>
            <li>Misrepresent yourself or impersonate others</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">4. No Warranties</h2>
          <p>
            DiffZero is provided "AS IS" without warranties of any kind, either express or implied. We do not guarantee:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>That the Service will be uninterrupted or error-free</li>
            <li>The accuracy or completeness of diff results</li>
            <li>That the Service will meet your specific requirements</li>
          </ul>
          <p className="mt-4 text-sm text-yellow-400">
            <strong>Important:</strong> Always verify critical comparisons manually. Do not rely solely on DiffZero for production deployments or legal decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
          <p>
            In no event shall DiffZero, its operators, or contributors be liable for any damages (including lost profits, data loss, or business interruption) arising from your use or inability to use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">6. Privacy and Data</h2>
          <p>
            DiffZero operates entirely client-side. Your comparison data never leaves your browser. See our{' '}
            <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a> for details.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            You are solely responsible for the security and confidentiality of any information you paste into DiffZero.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">7. Third-Party Content</h2>
          <p>
            DiffZero may display advertisements via Google AdSense. We are not responsible for the content of these ads or the practices of advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">8. Intellectual Property</h2>
          <p>
            The DiffZero codebase, design, and branding are protected by copyright. The diff algorithm uses open-source libraries (see attributions in our{' '}
            <a href="https://github.com/sertlab/diffzero" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">9. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last Modified" date. Continued use of the Service constitutes acceptance of modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].
          </p>
        </section>

        <section className="border-t border-gray-800 pt-6 mt-8">
          <p className="text-sm text-gray-500">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
}
