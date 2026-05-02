import { useState } from 'react';

/**
 * CreatePlanForm Component - Form untuk menambah rencana transaksi baru
 */
export default function CreatePlanForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    targetGwei: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error untuk field yang diubah
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nama transaksi tidak boleh kosong';
    }
    if (!formData.targetGwei || isNaN(formData.targetGwei) || formData.targetGwei <= 0) {
      newErrors.targetGwei = 'Target Gwei harus berupa angka positif';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    onSubmit({
      name: formData.name.trim(),
      targetGwei: parseFloat(formData.targetGwei),
    });

    // Reset form
    setFormData({
      name: '',
      targetGwei: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
          Nama Transaksi
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Misal: Swap ETH ke USDC"
          className={`w-full px-4 py-3 rounded-lg input-etched ${
            errors.name ? 'border-rose-500/50' : 'border-slate-700/50'
          } text-slate-100 placeholder-slate-500 focus:outline-none transition-smooth`}
        />
        {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="targetGwei" className="block text-sm font-semibold text-slate-300 mb-2">
          Target Gwei
        </label>
        <input
          type="number"
          id="targetGwei"
          name="targetGwei"
          value={formData.targetGwei}
          onChange={handleChange}
          placeholder="Misal: 45"
          step="0.01"
          min="0"
          className={`w-full px-4 py-3 rounded-lg input-etched ${
            errors.targetGwei ? 'border-rose-500/50' : 'border-slate-700/50'
          } text-slate-100 placeholder-slate-500 focus:outline-none transition-smooth`}
        />
        {errors.targetGwei && <p className="text-xs text-rose-400 mt-1">{errors.targetGwei}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 btn-primary hover:btn-primary text-white font-semibold rounded-lg transition-smooth active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 inner-glow"
      >
        + Tambah Rencana
      </button>
    </form>
  );
}
