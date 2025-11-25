import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { useForm } from 'react-hook-form';
import { submitLead } from '../api/leadApi';
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const InterestedModal = () => {
  const { activeProperty, closeModal } = useModal();
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState('idle');

  const onSubmit = async (values) => {
    if (!activeProperty) return;
    setStatus('loading');
    try {
      await submitLead({ ...values, propertyId: activeProperty.id });
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        reset();
        closeModal();
      }, 1200);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {activeProperty && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs uppercase text-gray-500">I'm Interested</p>
                <h3 className="text-xl font-semibold">{activeProperty.title}</h3>
                <p className="text-sm text-gray-500">ID: {activeProperty.id}</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-charcoal">
                <X />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-xs text-gray-500">Name</label>
                <input required {...register('name')} className="w-full rounded-lg border-gray-200" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Phone</label>
                <input required {...register('phone')} className="w-full rounded-lg border-gray-200" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Email (optional)</label>
                <input type="email" {...register('email')} className="w-full rounded-lg border-gray-200" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Message</label>
                <textarea rows={3} {...register('message')} className="w-full rounded-lg border-gray-200" />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded-xl bg-turquoise text-white font-semibold shadow-soft"
              >
                {status === 'loading' ? 'Sending...' : 'Send details'}
              </button>
            </form>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-turquoise mt-3 text-sm">
                <Sparkles size={16} /> Sent! We will reach out shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="text-sm text-red-500 mt-3">Could not send right now. Please try again.</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InterestedModal;
