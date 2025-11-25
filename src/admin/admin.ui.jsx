export const Card = ({ title, value, children }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-2">
    <div className="text-xs uppercase text-gray-500">{title}</div>
    <div className="text-2xl font-semibold text-turquoise">{value}</div>
    {children}
  </div>
);

export const Table = ({ columns, data }) => (
  <div className="overflow-auto rounded-2xl border border-gray-100 bg-white">
    <table className="min-w-full text-sm">
      <thead className="bg-mist text-gray-600">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-3 text-left font-medium">{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-t border-gray-100">
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-gray-700">
                {typeof col.render === 'function' ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
