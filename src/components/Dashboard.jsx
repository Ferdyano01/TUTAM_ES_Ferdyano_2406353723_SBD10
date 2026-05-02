import Sidebar from './Sidebar';
import TopMetrics from './TopMetrics';
import Chart from './Chart';
import PlansList from './PlansList';
import CreatePlanForm from './CreatePlanForm';

export default function Dashboard({ plans, onDelete, onAdd }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <header className="topbar glass p-4 flex items-center justify-between">
          <div className="topbar-left">
            <h2 className="text-on-surface muted-small">Gas Fee Planner</h2>
            <p className="muted-small">Selamat Datang, Commander.</p>
          </div>
          <div className="topbar-actions flex items-center gap-3">
            <input className="search input-etched" placeholder="Cari transaksi..." />
            <button className="icon-btn"><span className="material-symbols-outlined">notifications</span></button>
            <button className="icon-btn"><span className="material-symbols-outlined">settings</span></button>
          </div>
        </header>

        <main className="main-content p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <TopMetrics currentGas={12.4} trend={'down'} activePlans={plans.length} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Chart />
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4 inner-glow">
                  <h4 className="text-on-surface mb-3">Rencana Transaksi Baru</h4>
                  <CreatePlanForm onSubmit={onAdd} />
                </div>
                <div className="glass rounded-xl p-4 inner-glow">
                  <h4 className="text-on-surface mb-3">Daftar Rencana</h4>
                  <PlansList plans={plans} onDelete={onDelete} />
                </div>
              </div>
            </div>

            <aside className="glass rounded-xl p-4 inner-glow">
              <h4 className="text-on-surface mb-3">Aktivitas</h4>
              <div className="muted-small">Tidak ada aktivitas terbaru.</div>
            </aside>
          </div>

        </main>

        <button className="fab">+</button>
      </div>
    </div>
  );
}
