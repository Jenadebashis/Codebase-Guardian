import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('Rendering ScanHistory component', {scans});
  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await api.get('/scans');
        setScans(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Complete':
        return 'text-success';
      case 'Failed':
        return 'text-danger';
      case 'Pending':
        return 'text-warning';
      default:
        return 'text-text-dim';
    }
  };

  if (loading) {
    return <p className="text-text-dim">Loading scan history...</p>;
  }

  return (
    <div className="bg-surface rounded-xl-2 shadow-neon-sm p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Scan History</h2>
      {scans.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-dim uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-dim uppercase tracking-wider">
                  Language
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-dim uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-dim uppercase tracking-wider">
                  Snippet Preview
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {scans.map((scan) => (
                <tr key={scan._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {new Date(scan.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                    {scan.language}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getStatusClass(scan.status)}`}>
                    {scan.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dim font-mono">
                    {scan.codeSnippet}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/scan/${scan._id}`} className="text-primary hover:text-primary-600">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-text-dim">No scans found.</p>
      )}
    </div>
  );
};

export default ScanHistory;
