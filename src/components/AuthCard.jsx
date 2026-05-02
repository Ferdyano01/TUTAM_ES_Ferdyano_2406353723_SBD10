import { useState } from 'react';
import RegisterForm from './RegisterForm';

export default function AuthCard({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [credentials, setCredentials] = useState({ id: '', password: '' });

  const handleLogin = (e) => {
    e?.preventDefault();
    // naive accept any non-empty credentials
    if (!credentials.id) return alert('Masukkan email atau wallet');
    onLogin({ id: credentials.id });
  };

  return (
    <div className="glass-card rounded-xl p-8 border border-outline-variant/30 transition-all duration-500">
      <div className="mb-stack-md text-center">
        <h2 className="font-headline-md text-title-sm text-on-surface mb-2">{mode === 'login' ? 'Welcome Back' : 'Create account'}</h2>
        <p className="text-on-surface-variant text-sm opacity-80">{mode === 'login' ? 'Access your predictive gas dashboard' : 'Create a free account to save plans'}</p>
      </div>

      {mode === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-stack-md">
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">Email or Wallet Address</label>
            <div className="relative flex items-center glow-border border border-outline-variant/50 rounded bg-surface-container-low transition-all">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">account_balance_wallet</span>
              <input value={credentials.id} onChange={(e) => setCredentials((p) => ({ ...p, id: e.target.value }))} className="w-full bg-transparent border-none py-3 pl-10 pr-4 text-on-surface focus:ring-0 placeholder:text-on-tertiary-fixed-variant/50 font-body-md" placeholder="0x... or email@domain.com" type="text" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant ml-1">Password</label>
            <div className="relative flex items-center glow-border border border-outline-variant/50 rounded bg-surface-container-low transition-all">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">lock</span>
              <input value={credentials.password} onChange={(e) => setCredentials((p) => ({ ...p, password: e.target.value }))} className="w-full bg-transparent border-none py-3 pl-10 pr-4 text-on-surface focus:ring-0 placeholder:text-on-tertiary-fixed-variant/50 font-body-md" placeholder="••••••••" type="password" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => alert('Reset password flow (stub)')} className="text-xs text-primary hover:text-secondary-fixed transition-colors">Forgot password?</button>
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-primary-container text-on-primary-container rounded font-title-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(188,19,254,0.12)]">Login</button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/20"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1A1B23] px-2 text-on-surface-variant">Or continue with</span></div>
          </div>

          <button type="button" className="w-full py-3 border border-secondary-container/50 text-secondary-container rounded flex items-center justify-center gap-3 font-title-sm hover:bg-secondary-container/5 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>generating_tokens</span>
            Connect Wallet
          </button>

          <div className="mt-4 text-center">
            <p className="text-on-surface-variant text-sm">New here? <button onClick={() => setMode('register')} className="text-primary font-semibold hover:underline">Create an account</button></p>
          </div>
        </form>
      ) : (
        <RegisterForm onRegister={(u) => onLogin({ id: u.email || u.wallet || u.name })} onCancel={() => setMode('login')} />
      )}
    </div>
  );
}
