import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Filter, RotateCcw } from 'lucide-react';

const PropertyFilters = ({ onChange, onReset, values }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: values });

  useEffect(() => {
    reset(values);
  }, [values, reset]);

  const submit = (data) => {
    onChange(data);
  };

  const handleReset = () => {
    reset(values);
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm grid md:grid-cols-3 lg:grid-cols-6 gap-3"
    >
      <div>
        <label className="text-xs text-gray-500">Type</label>
        <select {...register('type')} className="w-full rounded-lg border-gray-200">
          <option value="all">Any</option>
          <option value="villa">Villa</option>
          <option value="apartment">Apartment</option>
          <option value="studio">Studio</option>
          <option value="shop">Shop</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-gray-500">Rent/Sale</label>
        <select {...register('rent')} className="w-full rounded-lg border-gray-200">
          <option value="all">Any</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-gray-500">Location</label>
        <select {...register('location')} className="w-full rounded-lg border-gray-200">
          <option value="all">Any</option>
          <option value="Hurghada">Hurghada</option>
          <option value="Sahl Hasheesh">Sahl Hasheesh</option>
          <option value="El Gouna">El Gouna</option>
          <option value="Soma Bay">Soma Bay</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-gray-500">Bedrooms</label>
        <select {...register('bedrooms')} className="w-full rounded-lg border-gray-200">
          <option value="any">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500">Min Price</label>
          <input type="number" {...register('minPrice')} className="w-full rounded-lg border-gray-200" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Max Price</label>
          <input type="number" {...register('maxPrice')} className="w-full rounded-lg border-gray-200" />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500">Sort</label>
        <select {...register('sort')} className="w-full rounded-lg border-gray-200">
          <option value="newest">Newest</option>
          <option value="price-asc">Lowest price</option>
          <option value="price-desc">Highest price</option>
        </select>
      </div>

      <div className="md:col-span-3 lg:col-span-6 flex flex-wrap gap-2 justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-600"
        >
          <RotateCcw size={16} /> Reset
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-turquoise text-white shadow-soft"
        >
          <Filter size={16} /> Apply Filters
        </button>
      </div>
    </form>
  );
};

export default PropertyFilters;
