/**
 * StatusBadge Component - Lencana status untuk plan card
 */
export default function StatusBadge({ status = 'pending' }) {
  if (status === 'ready') {
    return (
      <span className="status-base status-ready">
        <span className="status-dot" aria-hidden />
        ✓ Siap Eksekusi
      </span>
    );
  }

  return (
    <span className="status-base status-pending">
      <span className="status-dot" aria-hidden />
      ⏳ Menunggu
    </span>
  );
}
