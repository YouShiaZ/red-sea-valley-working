import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { seedProperties } from '../data/properties';
import { createProperty, updateProperty } from '../api/propertyApi';

const empty = {
  title: '',
  type: 'villa',
  location: 'Hurghada',
  price: '',
  rent: false,
  bedrooms: 1,
  bathrooms: 1,
  area: 50,
  furnished: false,
  floor: 1,
  finishing: 'Premium',
  status: 'available',
  description: '',
  coordinates: { lat: 0, lng: 0 },
  images: []
};

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = seedProperties.find((p) => p.id === id);
  const { register, handleSubmit, setValue, getValues } = useForm({ defaultValues: existing || empty });

  const onSubmit = async (values) => {
    try {
      if (existing) {
        await updateProperty(existing.id, values);
      } else {
        await createProperty(values);
      }
      navigate('/admin/properties');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase text-gray-500">Inventory</p>
        <h1 className="text-2xl font-semibold">{existing ? 'Edit property' : 'Add property'}</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Title</label>
            <input {...register('title')} required className="w-full rounded-lg border-gray-200" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Type</label>
            <select {...register('type')} className="w-full rounded-lg border-gray-200">
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="studio">Studio</option>
              <option value="shop">Shop</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">Location</label>
            <select {...register('location')} className="w-full rounded-lg border-gray-200">
              <option value="Hurghada">Hurghada</option>
              <option value="Sahl Hasheesh">Sahl Hasheesh</option>
              <option value="El Gouna">El Gouna</option>
              <option value="Soma Bay">Soma Bay</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">Price</label>
            <input type="number" {...register('price')} className="w-full rounded-lg border-gray-200" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Status</label>
            <select {...register('status')} className="w-full rounded-lg border-gray-200">
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" {...register('rent')} />
            <span className="text-sm text-gray-700">For Rent</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-500">Bedrooms</label>
            <input type="number" {...register('bedrooms')} className="w-full rounded-lg border-gray-200" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Bathrooms</label>
            <input type="number" {...register('bathrooms')} className="w-full rounded-lg border-gray-200" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Area (m2)</label>
            <input type="number" {...register('area')} className="w-full rounded-lg border-gray-200" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" {...register('furnished')} /> Furnished
          </div>
          <div>
            <label className="text-xs text-gray-500">Floor</label>
            <input type="number" {...register('floor')} className="w-full rounded-lg border-gray-200" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Finishing</label>
            <input {...register('finishing')} className="w-full rounded-lg border-gray-200" />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500">Description</label>
          <textarea rows={4} {...register('description')} className="w-full rounded-lg border-gray-200" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Latitude</label>
            <input
              type="number"
              step="0.0001"
              className="w-full rounded-lg border-gray-200"
              value={Number(getValues('coordinates.lat') || 0)}
              onChange={(e) => setValue('coordinates.lat', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Longitude</label>
            <input
              type="number"
              step="0.0001"
              className="w-full rounded-lg border-gray-200"
              value={Number(getValues('coordinates.lng') || 0)}
              onChange={(e) => setValue('coordinates.lng', parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500">Images (comma separated URLs)</label>
          <textarea
            rows={3}
            className="w-full rounded-lg border-gray-200"
            value={(getValues('images') || []).join(', ')}
            onChange={(e) => setValue('images', e.target.value.split(',').map((v) => v.trim()))}
          />
        </div>

        <div className="flex justify-end">
          <button className="px-5 py-3 rounded-xl bg-turquoise text-white shadow-soft">Save property</button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
