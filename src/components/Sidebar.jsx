/**
 * Sidebar - navigation left panel inspired by provided design
 */
export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="brand p-6">
        <div className="brand-name text-primary font-bold text-lg">GasPlanner</div>
        <div className="brand-sub muted-small">Orbital Precision</div>
      </div>

      <nav className="nav-list">
        <button className="nav-item active"><span className="material-symbols-outlined">dashboard</span><span>Dashboard</span></button>
        <button className="nav-item"><span className="material-symbols-outlined">insights</span><span>Analytics</span></button>
        <button className="nav-item"><span className="material-symbols-outlined">bolt</span><span>Active Plans</span></button>
        <button className="nav-item"><span className="material-symbols-outlined">history</span><span>History</span></button>
      </nav>

      <div className="sidebar-footer">
        <div className="profile">
          <img src="https://i.pravatar.cc/40?img=8" alt="avatar" className="avatar" />
          <div className="profile-info">
            <div className="profile-name">Alex Void</div>
            <div className="profile-role muted-small">Premium Node</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
