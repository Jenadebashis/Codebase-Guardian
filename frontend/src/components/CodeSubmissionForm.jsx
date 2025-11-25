import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createScan } from '../redux/actions/scanActions';

const CodeSubmissionForm = () => {
  const [submissionType, setSubmissionType] = useState('text'); // 'text' or 'file'
  const [codeSnippet, setCodeSnippet] = useState('');
  const [codeFile, setCodeFile] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.scans);

  const handleFileChange = (e) => {
    setCodeFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submissionType === 'file' && codeFile) {
      const formData = new FormData();
      formData.append('language', language);
      formData.append('codeFile', codeFile);
      dispatch(createScan(formData, true));
    } else {
      dispatch(createScan({ language, codeSnippet }, false));
    }
  };

  return (
    <div className="bg-surface rounded-xl-2 shadow-neon-sm p-6">
      {/* Submission type toggle */}
      <div className="flex justify-center mb-4">
        <div className="flex rounded-md bg-bg-alt p-1">
          <button
            onClick={() => setSubmissionType('text')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${submissionType === 'text' ? 'bg-primary text-white' : 'text-text-dim'}`}
          >
            Code Snippet
          </button>
          <button
            onClick={() => setSubmissionType('file')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${submissionType === 'file' ? 'bg-primary text-white' : 'text-text-dim'}`}
          >
            Upload File
          </button>
        </div>
      </div>

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
            {/* Add more languages as supported by the backend */}
          </select>
        </div>

        {submissionType === 'text' ? (
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
        ) : (
          <div className="mb-4">
            <label htmlFor="code-file" className="block text-sm font-medium text-text-dim mb-2">
              Code File
            </label>
            <input
              id="code-file"
              type="file"
              onChange={handleFileChange}
              className="w-full text-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-bg hover:file:bg-primary-600"
            />
          </div>
        )}

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
