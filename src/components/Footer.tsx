import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-gray-800 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} DiffZero. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
