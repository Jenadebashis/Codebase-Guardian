
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createScan } from '../redux/actions/scanActions';

const CodeSubmissionForm = () => {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [language, setLanguage] = useState('javascript');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.scans);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createScan({ codeSnippet, language }));
  };

  return (
    <div className="bg-surface rounded-xl-2 shadow-neon-sm p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-text-dim mb-2">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="code-snippet" className="block text-sm font-medium text-text-dim mb-2">
            Code Snippet
          </label>
          <textarea
            id="code-snippet"
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            placeholder="Enter your code snippet here..."
            rows="10"
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary font-mono"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-bg font-bold py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Scan'}
          </button>
          {loading && (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
              <span className="ml-2 text-text-dim">Scanning Code, Please Wait...</span>
            </div>
          )}
        </div>
      </form>
      {error && (
        <div className="mt-4 bg-danger text-white p-3 rounded-md">
          <p className="font-bold">Error:</p>
          <p>{error.msg}</p>
        </div>
      )}
    </div>
  );
};

export default CodeSubmissionForm;
