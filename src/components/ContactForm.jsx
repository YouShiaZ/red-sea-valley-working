import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/motions';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (values) => {
    console.log('Contact form', values);
    reset();
  };

  return (
    <motion.form
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4"
    >
      <div>
        <label className="text-xs text-gray-500">Name</label>
        <input required {...register('name')} className="w-full rounded-lg border-gray-200" />
      </div>
      <div>
        <label className="text-xs text-gray-500">Email</label>
        <input type="email" {...register('email')} className="w-full rounded-lg border-gray-200" />
      </div>
      <div>
        <label className="text-xs text-gray-500">Phone</label>
        <input required {...register('phone')} className="w-full rounded-lg border-gray-200" />
      </div>
      <div>
        <label className="text-xs text-gray-500">Message</label>
        <textarea rows={4} {...register('message')} className="w-full rounded-lg border-gray-200" />
      </div>
      <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-turquoise text-white font-semibold shadow-soft">
        <Send size={18} /> Send message
      </button>
    </motion.form>
  );
};

export default ContactForm;
