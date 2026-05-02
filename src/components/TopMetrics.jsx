/**
 * TopMetrics Component - Grid 3 kartu metrik utama
 */
export default function TopMetrics({ currentGas, trend, activePlans }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      <div className="metric-card">
        <div className="metric-head">
          <div className="metric-label">Gas Fee Saat Ini</div>
          <div className="text-xl">⛽</div>
        </div>
        <div className="metric-value">{currentGas} <span className="metric-sub">Gwei</span></div>
        <div className="metric-sub mt-2">Diperbarui secara real-time</div>
      </div>

      <div className="metric-card">
        <div className="metric-head">
          <div className="metric-label">Tren Gas</div>
          <div className="text-xl">📊</div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className={`text-3xl font-bold ${trend === 'up' ? 'text-danger' : 'text-primary'}`}>{trend === 'up' ? '↑' : '↓'}</div>
          <div className="metric-sub">{trend === 'up' ? 'Naik' : 'Turun'}</div>
        </div>
        <div className="metric-sub mt-2">Perubahan 1 jam terakhir</div>
      </div>

      <div className="metric-card">
        <div className="metric-head">
          <div className="metric-label">Rencana Aktif</div>
          <div className="text-xl">📋</div>
        </div>
        <div className="metric-value">{activePlans}</div>
        <div className="metric-sub mt-2">Rencana transaksi tersimpan</div>
      </div>
    </div>
  );
}
