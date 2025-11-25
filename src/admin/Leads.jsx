import { Table } from './admin.ui';

const sampleLeads = [
  { id: 'lead-1', name: 'Amina', phone: '+20123456789', propertyId: 'rsv-001', message: 'Please arrange a tour.' },
  { id: 'lead-2', name: 'Karim', phone: '+20111111111', propertyId: 'rsv-003', message: 'Interested in renting for 6 months.' }
];

const Leads = () => {
  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'phone', title: 'Phone' },
    { key: 'propertyId', title: 'Property ID' },
    { key: 'message', title: 'Message' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase text-gray-500">Leads</p>
        <h1 className="text-2xl font-semibold">Interested buyers</h1>
      </div>
      <Table columns={columns} data={sampleLeads} />
    </div>
  );
};

export default Leads;
