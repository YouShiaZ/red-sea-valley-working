import { useForm } from 'react-hook-form';
import { loginAdmin } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (values) => {
    try {
      await loginAdmin(values);
      navigate('/admin');
    } catch (e) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mist px-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 w-full max-w-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-mist flex items-center justify-center text-turquoise">
            <Shield />
          </div>
          <div>
            <p className="text-xs uppercase text-gray-500">Admin</p>
            <h1 className="text-xl font-semibold">RSV Dashboard</h1>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs text-gray-500">Email</label>
            <input type="email" {...register('email')} required className="w-full rounded-lg border-gray-200" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Password</label>
            <input type="password" {...register('password')} required className="w-full rounded-lg border-gray-200" />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <button className="w-full px-4 py-3 rounded-xl bg-turquoise text-white font-semibold shadow-soft">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
