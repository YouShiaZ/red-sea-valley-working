import { Link } from 'react-router-dom';
import { seedProperties } from '../data/properties';
import { Table } from './admin.ui';
import { formatPrice } from '../utils/format';
import { Plus, Pencil, Trash } from 'lucide-react';

const Properties = () => {
  const columns = [
    { key: 'title', title: 'Title' },
    { key: 'location', title: 'Location' },
    { key: 'type', title: 'Type' },
    { key: 'price', title: 'Price', render: (v) => formatPrice(v) },
    { key: 'status', title: 'Status', render: (v) => v },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Link to={`/admin/properties/${row.id}`} className="text-turquoise"><Pencil size={16} /></Link>
          <button className="text-red-500" title="Delete"><Trash size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-gray-500">Inventory</p>
          <h1 className="text-2xl font-semibold">Properties</h1>
        </div>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-turquoise text-white"
        >
          <Plus size={18} /> Add property
        </Link>
      </div>
      <Table columns={columns} data={seedProperties} />
    </div>
  );
};

export default Properties;
