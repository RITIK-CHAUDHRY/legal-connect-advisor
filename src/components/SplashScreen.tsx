
import { useEffect, useState } from 'react';
import { Scale } from 'lucide-react';

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Custom SVG Illustration */}
        <div className="mb-8">
          <svg
            width="400"
            height="300"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto animate-fade-in"
          >
            {/* Computer Screen */}
            <rect x="50" y="80" width="300" height="180" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
            <rect x="60" y="90" width="280" height="160" rx="5" fill="#111827"/>
            
            {/* Lawyer on Screen */}
            <circle cx="200" cy="150" r="40" fill="#f3f4f6"/>
            <circle cx="200" cy="130" r="20" fill="#d1d5db"/>
            <rect x="180" y="150" width="40" height="60" rx="5" fill="#374151"/>
            <rect x="185" y="155" width="30" height="50" rx="3" fill="#1f2937"/>
            
            {/* Lawyer's Briefcase */}
            <rect x="240" y="180" width="30" height="20" rx="3" fill="#92400e" stroke="#78350f" strokeWidth="1"/>
            
            {/* Client Side */}
            <circle cx="320" cy="220" r="25" fill="#f9fafb"/>
            <circle cx="320" cy="205" r="15" fill="#e5e7eb"/>
            <rect x="305" y="220" width="30" height="40" rx="3" fill="#6b7280"/>
            
            {/* Documents */}
            <rect x="270" y="240" width="20" height="25" rx="2" fill="#ffffff" stroke="#d1d5db" strokeWidth="1"/>
            <rect x="275" y="245" width="10" height="2" fill="#374151"/>
            <rect x="275" y="250" width="8" height="2" fill="#374151"/>
            <rect x="275" y="255" width="12" height="2" fill="#374151"/>
            
            {/* Connection Lines */}
            <path d="M240 150 Q280 120 320 180" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" fill="none">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite"/>
            </path>
            
            {/* Speech Bubbles */}
            <ellipse cx="150" cy="100" rx="40" ry="20" fill="#ffffff" stroke="#d1d5db" strokeWidth="1"/>
            <path d="M150 120 L160 130 L140 130 Z" fill="#ffffff" stroke="#d1d5db" strokeWidth="1"/>
            <text x="150" y="105" textAnchor="middle" fontSize="12" fill="#374151">Legal Advice</text>
            
            <ellipse cx="350" cy="180" rx="30" ry="15" fill="#ffffff" stroke="#d1d5db" strokeWidth="1"/>
            <path d="M350 195 L340 205 L360 205 Z" fill="#ffffff" stroke="#d1d5db" strokeWidth="1"/>
            <text x="350" y="185" textAnchor="middle" fontSize="10" fill="#374151">My Case</text>
            
            {/* Gavel Icon */}
            <g transform="translate(160, 200)">
              <rect x="0" y="10" width="30" height="8" rx="4" fill="#78350f"/>
              <rect x="12" y="0" width="6" height="30" rx="3" fill="#92400e"/>
              <circle cx="15" cy="35" r="8" fill="#1f2937"/>
            </g>
            
            {/* Floating Justice Scales */}
            <g transform="translate(80, 50)" className="animate-float">
              <Scale className="w-8 h-8 text-gray-600" />
            </g>
          </svg>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Scale className="h-8 w-8 text-gray-800 animate-pulse dark:text-white" />
          <span className="text-3xl font-bold text-gray-900 dark:text-white">LawConnect</span>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          Connecting you with legal expertise...
        </p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-gray-800 dark:bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gray-800 dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-gray-800 dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
