import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const ScanDetails = () => {
  const { id } = useParams();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScan = async () => {
      try {
        const res = await api.get(`/scans/${id}`);
        setScan(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchScan();
  }, [id]);

  if (loading) {
    return <p className="text-center text-text-dim">Loading scan details...</p>;
  }

  if (!scan) {
    return <p className="text-center text-danger">Scan not found.</p>;
  }

  return (
    <div className="bg-surface rounded-xl-2 shadow-neon-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">Scan Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-bg-alt p-4 rounded-lg">
          <p className="text-sm text-text-dim font-medium">Scan ID</p>
          <p className="text-lg font-mono text-primary">{scan._id}</p>
        </div>
        <div className="bg-bg-alt p-4 rounded-lg">
          <p className="text-sm text-text-dim font-medium">Timestamp</p>
          <p className="text-lg text-text">{new Date(scan.timestamp).toLocaleString()}</p>
        </div>
        <div className="bg-bg-alt p-4 rounded-lg">
          <p className="text-sm text-text-dim font-medium">Language</p>
          <p className="text-lg text-text">{scan.language}</p>
        </div>
      </div>

      <div className="bg-bg-alt p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-primary">Code Snippet</h3>
        <pre className="bg-bg p-4 rounded-lg text-text-dim text-sm overflow-x-auto font-mono"><code>{scan.codeSnippet}</code></pre>
      </div>
    </div>
  );
};

export default ScanDetails;
