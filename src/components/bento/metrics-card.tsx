'use client';

import { useEffect, useState } from 'react';

export function MetricsCard() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { label: 'Projects', value: 15, suffix: '+', color: 'text-blue-400' },
    { label: 'Experience', value: 3, suffix: ' yrs', color: 'text-green-400' },
    { label: 'Technologies', value: 20, suffix: '+', color: 'text-purple-400' },
  ];

  return (
    <div className="bento-card h-full p-6 flex flex-col justify-center">
      <h3 className="text-sm font-bold text-gray-800 dark:text-white/80 mb-4 font-mono">METRICS</h3>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-gray-600 dark:text-white/60 font-mono uppercase tracking-wider">
                {metric.label}
              </span>
              <span className={`text-lg font-bold ${metric.color} font-mono`}>
                {animate ? metric.value : 0}
                <span className="text-sm">{metric.suffix}</span>
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${
                  metric.color === 'text-blue-400'
                    ? 'from-blue-400 to-blue-600'
                    : metric.color === 'text-green-400'
                    ? 'from-green-400 to-green-600'
                    : 'from-purple-400 to-purple-600'
                } rounded-full transition-all duration-1000 ease-out`}
                style={{
                  width: animate ? '100%' : '0%',
                  transitionDelay: `${index * 200}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Decorative element */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 dark:text-white/60 font-mono">Live stats</span>
        </div>
      </div>
    </div>
  );
}