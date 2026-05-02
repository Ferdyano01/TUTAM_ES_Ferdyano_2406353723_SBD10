import { useState, useEffect } from 'react';
import axios from 'axios'; // MENGIMPOR AXIOS
import './App.css'; 

function App() {
  // --- STATE MANAJEMEN HALAMAN ---
  const [currentView, setCurrentView] = useState('register');

  // --- STATE REGISTRASI & PENGGUNA AKTIF ---
  const [inputName, setInputName] = useState(''); 
  const [activeUser, setActiveUser] = useState('Mahasiswa'); 

  // --- STATE PENCARIAN (SEARCH) ---
  const [searchQuery, setSearchQuery] = useState('');

  // --- STATE DATA LAPORAN (CRD) ---
  const [reports, setReports] = useState([]);

  // --- STATE FORM CREATE ---
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPriority, setNewPriority] = useState('Menengah');

  // ==========================================
  // FUNGSI KOMUNIKASI DENGAN BACKEND (POSTGRESQL)
  // ==========================================

  // 1. READ: Mengambil data dari Backend
  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports');
      setReports(response.data); // Memasukkan data dari database ke state React
    } catch (error) {
      console.error("Gagal mengambil data dari server:", error);
    }
  };

  // Menjalankan fetchReports otomatis saat komponen pertama kali dimuat
  useEffect(() => {
    fetchReports();
  }, []);

  // 2. CREATE: Mengirim data laporan baru ke Backend
  const handleCreateReport = async (e) => {
    e.preventDefault();
    if (!newTitle || !newLocation) return;

    // Kita hanya mengirim data yang diinput user. 
    // ID, Tanggal, dan Status akan dibuat otomatis oleh PostgreSQL!
    const newTicketData = {
      title: newTitle,
      location: newLocation,
      priority: newPriority
    };

    try {
      // Kirim POST request ke backend
      const response = await axios.post('http://localhost:5000/api/reports', newTicketData);
      
      // Tambahkan data yang berhasil disimpan (beserta ID dari DB) ke tampilan teratas
      setReports([response.data, ...reports]); 
      
      // Reset Form
      setNewTitle('');
      setNewLocation('');
      setNewPriority('Menengah');
      setCurrentView('dashboard');
      setSearchQuery('');
    } catch (error) {
      console.error("Gagal menyimpan laporan:", error);
      alert("Terjadi kesalahan saat menyimpan laporan ke database.");
    }
  };

  // 3. DELETE: Menghapus data dari Backend
  const handleDelete = async (idToRemove) => {
    try {
      // Kirim DELETE request ke backend berdasarkan ID
      await axios.delete(`http://localhost:5000/api/reports/${idToRemove}`);
      
      // Jika berhasil di database, hapus juga dari tampilan React
      setReports(reports.filter(report => report.id !== idToRemove));
    } catch (error) {
      console.error("Gagal menghapus laporan:", error);
      alert("Terjadi kesalahan saat menghapus laporan.");
    }
  };

  // --- HANDLER FUNGSI LOGIN ---
  const handleRegister = (e) => {
    e.preventDefault();
    if (inputName.trim() !== '') {
      setActiveUser(inputName);
    }
    setCurrentView('dashboard');
  };

  // --- LOGIKA FILTER PENCARIAN ---
  const filteredReports = reports.filter(report => {
    const query = searchQuery.toLowerCase();
    return (
      report.id.toLowerCase().includes(query) ||
      report.title.toLowerCase().includes(query) ||
      report.location.toLowerCase().includes(query)
    );
  });


  // ==========================================
  // VIEW 1: HALAMAN REGISTRASI
  // ==========================================
  if (currentView === 'register') {
    return (
      <div className="min-h-screen w-full bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans fade-in-up">
        <div className="w-full max-w-[1100px] bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
          
          {/* Panel Kiri (Gelap) */}
          <div className="lg:col-span-5 bg-[#111111] text-white p-8 md:p-12 flex flex-col justify-between relative min-h-[400px] lg:min-h-full">
            <div className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#111111]/80 to-[#111111] pointer-events-none"></div>

            <div className="relative z-10 mb-12 lg:mb-0">
              <div className="flex items-center gap-2 mb-8 md:mb-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                <span className="text-xl md:text-2xl font-bold tracking-tight">LaporUI</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5">
                Sistem Pengelolaan<br/>Fasilitas Kampus<br/>Terpadu.
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">Wujudkan lingkungan belajar yang nyaman dan kondusif dengan pelaporan fasilitas yang cepat dan transparan di Universitas Indonesia.</p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <span className="text-sm font-medium text-gray-300">Resmi & Terintegrasi SSO UI</span>
              </div>
            </div>
          </div>

          {/* Panel Kanan (Form) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Buat Akun Baru</h2>
              <p className="text-sm text-gray-500">Silakan lengkapi data diri Anda untuk mengakses layanan LaporUI.</p>
            </div>

            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)} 
                  placeholder="Contoh: Budi Santoso" 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors" 
                />
              </div>
              
              <button type="submit" className="w-full bg-[#FFD100] hover:bg-[#e6bc00] text-gray-900 font-bold py-3.5 rounded-lg transition-all active:scale-[0.99] mt-2">
                Daftar Sekarang
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2 & 3: MAIN APP LAYOUT (Sidebar & Header)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-800 fade-in-up">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex sticky top-0 h-screen shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="bg-[#FFD100] p-1.5 rounded text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
            </div>
            <div>
              <span className="font-bold text-lg leading-none block tracking-tight">LaporUI</span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider">STUDENT PORTAL</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <button onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${currentView === 'dashboard' ? 'bg-slate-50 text-slate-900 border border-slate-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            Dashboard
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setCurrentView('create')}
            className="w-full bg-[#FFD100] hover:bg-[#e6bc00] text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Laporan Baru
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-20 glass-header-light flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10 shrink-0">
          <div className="flex-1 max-w-md relative hidden sm:block">
            {/* Input Pencarian yang sudah Aktif */}
            <input 
              type="text" 
              placeholder="Cari laporan Anda (Judul, ID, Lokasi)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 transition-colors" 
            />
          </div>
          
          <div className="flex items-center gap-5 ml-auto">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">{activeUser}</div>
                <div className="text-xs font-medium text-slate-500">Mahasiswa</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center border-2 border-[#FFD100] uppercase">
                {activeUser.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content (Dashboard OR Create Form) */}
        <div className="p-6 lg:p-10 overflow-y-auto">
          
          {currentView === 'dashboard' ? (
            <>
              {/* --- VIEW 2: DASHBOARD KONTEN --- */}
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight mb-1">Halo, {activeUser.split(' ')[0]}! 👋</h1>
                <p className="text-slate-500 text-sm font-medium">Ini adalah ringkasan aktivitas pelaporan fasilitas Anda.</p>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Laporan</p>
                  <h3 className="text-3xl font-extrabold">{reports.length}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Sedang Diproses</p>
                  <h3 className="text-3xl font-extrabold text-amber-600">
                    {reports.filter(r => r.status === 'Sedang Diproses').length}
                  </h3>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg">
                    {searchQuery ? 'Hasil Pencarian' : 'Laporan Terakhir Anda'}
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-bold">ID Tiket</th>
                        <th className="px-6 py-4 font-bold">Judul & Lokasi</th>
                        <th className="px-6 py-4 font-bold">Prioritas</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {/* Mapping menggunakan data yang sudah difilter */}
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{report.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{report.title}</div>
                            <div className="text-slate-500 mt-0.5">{report.location}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">{report.priority}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-amber-600">{report.status}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDelete(report.id)} className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded transition-colors">
                              Batalkan
                            </button>
                          </td>
                        </tr>
                      ))}

                      {/* Kondisi Jika Laporan Kosong (Belum Pernah Buat) */}
                      {reports.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">Belum ada laporan yang Anda buat.</td>
                        </tr>
                      )}

                      {/* Kondisi Jika Pencarian Tidak Ditemukan (Tapi ada laporan) */}
                      {reports.length > 0 && filteredReports.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">
                            Tidak ditemukan laporan dengan kata kunci "{searchQuery}".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* --- VIEW 3: FORM BUAT LAPORAN BARU --- */}
              <div className="mb-8">
                <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Kembali ke Dashboard
                </button>
                <h1 className="text-3xl font-extrabold tracking-tight mb-1">Buat Laporan Baru</h1>
                <p className="text-slate-500 text-sm font-medium">Jelaskan detail kerusakan fasilitas yang Anda temukan.</p>
              </div>

              <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <form onSubmit={handleCreateReport} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Perangkat / Fasilitas</label>
                    <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Contoh: AC Mati, PC tidak nyala..." className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi Perangkat</label>
                    <input type="text" required value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Contoh: Lab Komputer - Gedung S" className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tingkat Prioritas</label>
                    <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition-all cursor-pointer">
                      <option value="Rendah">Rendah (Kerusakan Minor)</option>
                      <option value="Menengah">Menengah (Mengganggu Aktivitas)</option>
                      <option value="Tinggi">Tinggi (Kritis / Urgent)</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex gap-4">
                    <button type="submit" className="bg-black hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all">
                      Kirim Laporan
                    </button>
                    <button type="button" onClick={() => setCurrentView('dashboard')} className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold py-3 px-6 rounded-xl transition-all">
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

        </div>
      </main>
      
    </div>
  );
}

export default App;