import StatusBadge from './StatusBadge';

/**
 * PlanCard Component - Kartu individual untuk setiap rencana transaksi
 */
export default function PlanCard({ plan, onDelete }) {
  const handleDelete = () => {
    if (confirm(`Hapus rencana "${plan.name}"?`)) {
      onDelete(plan.id);
    }
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-5 md:p-6 hover:bg-opacity-60 transition-smooth border border-slate-700/50 card-3d glow-border inner-glow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        {/* Info Rencana */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate">
            {plan.name}
          </h4>
          <p className="text-sm text-slate-400 mb-3">
            Target: <span className="font-mono font-bold text-emerald-300">{plan.targetGwei} Gwei</span>
          </p>
          <StatusBadge status={plan.status} />
        </div>

        {/* Tombol Hapus */}
        <button
          onClick={handleDelete}
          className="w-full sm:w-auto px-4 py-2 btn-danger hover:opacity-90 rounded-lg font-semibold text-sm transition-smooth active:scale-95"
        >
          🗑️ Hapus
        </button>
      </div>
    </div>
  );
}
