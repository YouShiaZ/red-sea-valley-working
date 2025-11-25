import { seedProperties } from '../data/properties';
import { Card } from './admin.ui';

const Dashboard = () => {
  const total = seedProperties.length;
  const forSale = seedProperties.filter((p) => !p.rent).length;
  const forRent = seedProperties.filter((p) => p.rent).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase text-gray-500">Overview</p>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Total properties" value={total} />
        <Card title="For sale" value={forSale} />
        <Card title="For rent" value={forRent} />
      </div>
    </div>
  );
};

export default Dashboard;
