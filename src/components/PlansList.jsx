import PlanCard from './PlanCard';

/**
 * PlansList Component - Daftar rencana transaksi dalam bentuk tumpukan kartu
 */
export default function PlansList({ plans, onDelete }) {
  if (plans.length === 0) {
    return (
      <div className="glass rounded-xl p-6 sm:p-8 text-center border border-slate-700/50">
        <p className="text-slate-400 text-base sm:text-lg mb-2">
          Belum ada rencana transaksi.
        </p>
        <p className="text-slate-500 text-sm">
          Mulai dengan membuat rencana baru di kolom sebelah kiri.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} onDelete={onDelete} />
      ))}
    </div>
  );
}
