import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createScan } from '../redux/actions/scanActions';

const CodeSubmissionForm = () => {
  const [codeSnippet, setCodeSnippet] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.scans);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createScan({ codeSnippet }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
          placeholder="Enter your code snippet here..."
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Scanning Code, Please Wait...' : 'Submit Scan'}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CodeSubmissionForm;
