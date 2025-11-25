import { useForm } from 'react-hook-form';
import { fetchSettings, updateSettings } from '../api/settingsApi';
import { useEffect } from 'react';

const Settings = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: 'hello@redseavalley.com', whatsapp: '+20123456789', facebook: '', instagram: '', tiktok: '' }
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSettings();
        reset(data);
      } catch (error) {
        console.warn('Using default settings');
      }
    };
    load();
  }, [reset]);

  const onSubmit = async (values) => {
    await updateSettings(values);
    alert('Settings saved');
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase text-gray-500">Admin</p>
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="text-xs text-gray-500">Email</label><input {...register('email')} className="w-full rounded-lg border-gray-200" /></div>
          <div><label className="text-xs text-gray-500">WhatsApp</label><input {...register('whatsapp')} className="w-full rounded-lg border-gray-200" /></div>
          <div><label className="text-xs text-gray-500">Facebook</label><input {...register('facebook')} className="w-full rounded-lg border-gray-200" /></div>
          <div><label className="text-xs text-gray-500">Instagram</label><input {...register('instagram')} className="w-full rounded-lg border-gray-200" /></div>
          <div><label className="text-xs text-gray-500">TikTok</label><input {...register('tiktok')} className="w-full rounded-lg border-gray-200" /></div>
        </div>
        <button className="px-5 py-3 rounded-xl bg-turquoise text-white shadow-soft">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
