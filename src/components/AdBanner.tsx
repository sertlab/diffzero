'use client';

export default function AdBanner({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div className={`w-full flex justify-center ${position === 'top' ? 'mb-6' : 'mt-8'}`}>
      {/* Placeholder for future AdSense code */}
      <div className="w-full max-w-[728px] h-[90px] bg-[#18181b] border border-gray-800 border-dashed rounded-lg flex items-center justify-center">
        <span className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
          Ad Space ({position})
        </span>
      </div>
    </div>
  );
}