/**
 * Chart placeholder - simple SVG wave to mimic the glowing line chart
 */
export default function Chart({ className = '' }) {
  return (
    <div className={`chart-card glass rounded-xl p-4 relative overflow-hidden ${className}`}>
      <div className="chart-header flex justify-between items-center mb-3">
        <h4 className="text-on-surface muted-small">Riwayat Gas Fee</h4>
        <div className="chart-controls">
          <button className="chip">24H</button>
          <button className="chip">30D</button>
        </div>
      </div>

      <div className="chart-area relative">
        <svg viewBox="0 0 800 260" preserveAspectRatio="none" className="w-full h-56 chart-svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#ffb3ff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#8bceff" stopOpacity="0.08" />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path className="glow-fill" d="M0,160 C120,120 200,200 320,140 C420,90 520,200 640,140 C720,100 800,120 800,120 L800,260 L0,260 Z" fill="url(#g1)" opacity="0.6" />

          <path className="glow-line animate-stroke" d="M0,170 C120,130 200,210 320,150 C420,100 520,210 640,150 C720,110 800,130" stroke="#d7a3ff" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#blur)" />

          <path className="glow-line" d="M0,180 C120,140 200,220 320,160 C420,110 520,220 640,160 C720,120 800,140" stroke="#78d1ff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" strokeDasharray="8 10" />
        </svg>

        <div className="chart-tooltip">24H • Peak 24.8 Gwei</div>
      </div>
    </div>
  );
}
