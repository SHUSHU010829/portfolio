import Image from 'next/image';

export function ProfileCard() {
  return (
    <div className="bento-card h-full p-6 flex flex-col justify-center relative overflow-hidden">
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
          SC
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shuayuan Chuang</h2>
          <p className="text-gray-600 dark:text-white/60 font-mono text-sm">Frontend Developer</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm text-gray-700 dark:text-white/70">Available for freelance</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>Taiwan</span>
      </div>

      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-2xl"></div>
    </div>
  );
}