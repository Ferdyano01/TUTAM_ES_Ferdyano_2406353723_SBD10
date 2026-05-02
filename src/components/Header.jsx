/**
 * Header Component - Intro section dengan gambar latar belakang abstrak
 */
export default function Header() {
  return (
    <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-t-2xl">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=1200&auto=format&fit=crop")',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 md:p-10">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient-primary mb-3">
            ⛽ Gas Fee Planner
          </h1>
          <p className="muted max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
            Pantau harga gas secara real-time dan rencanakan transaksi Anda dengan cerdas.
            Hemat saldo kripto dengan mengeksekusi transaksi di saat yang tepat.
          </p>
        </div>
      </div>
    </div>
  );
}
