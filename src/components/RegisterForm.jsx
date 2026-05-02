import { useState } from 'react';

export default function RegisterForm({ onRegister, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', wallet: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErr = {};
    if (!form.name.trim()) newErr.name = 'Nama diperlukan';
    if (!form.email.includes('@')) newErr.email = 'Email tidak valid';
    if (!form.password || form.password.length < 6) newErr.password = 'Minimal 6 karakter';
    if (form.password !== form.confirm) newErr.confirm = 'Password tidak cocok';

    if (Object.keys(newErr).length) return setErrors(newErr);

    // store simple user record in localStorage (fake)
    try {
      const users = JSON.parse(localStorage.getItem('gfp_users') || '[]');
      users.push({ name: form.name.trim(), email: form.email.trim(), wallet: form.wallet.trim() });
      localStorage.setItem('gfp_users', JSON.stringify(users));
    } catch (e) {
      // ignore
    }

    onRegister({ name: form.name.trim(), email: form.email.trim(), wallet: form.wallet.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-md">
      <div>
        <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">Full name</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full bg-transparent border-none py-3 pl-3 pr-3 text-on-surface input-etched" placeholder="Nama lengkap" />
        {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">Email</label>
        <input name="email" value={form.email} onChange={handleChange} className="w-full bg-transparent border-none py-3 pl-3 pr-3 text-on-surface input-etched" placeholder="email@domain.com" />
        {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">Wallet (optional)</label>
        <input name="wallet" value={form.wallet} onChange={handleChange} className="w-full bg-transparent border-none py-3 pl-3 pr-3 text-on-surface input-etched" placeholder="0x..." />
      </div>

      <div>
        <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full bg-transparent border-none py-3 pl-3 pr-3 text-on-surface input-etched" placeholder="Minimal 6 karakter" />
        {errors.password && <p className="text-xs text-danger mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">Confirm Password</label>
        <input name="confirm" type="password" value={form.confirm} onChange={handleChange} className="w-full bg-transparent border-none py-3 pl-3 pr-3 text-on-surface input-etched" placeholder="Ulangi password" />
        {errors.confirm && <p className="text-xs text-danger mt-1">{errors.confirm}</p>}
      </div>

      <div className="flex gap-3">
        <button type="submit" className="flex-1 py-3 btn-primary rounded font-title-sm">Create account</button>
        <button type="button" onClick={onCancel} className="flex-1 py-3 btn-danger rounded font-title-sm">Cancel</button>
      </div>
    </form>
  );
}
