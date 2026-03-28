import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EOBAnalyzer.css';

function EOBAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, image (JPG/PNG), or spreadsheet (CSV/XLSX)');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, image (JPG/PNG), or spreadsheet (CSV/XLSX)');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/eob/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
      });

      setSuccess(true);
      setFile(null);
      navigate(`/results/${response.data.analysis_id}`);
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (err.code === 'ECONNABORTED') {
        setError('Upload timed out while analyzing this file. Try a smaller PDF or CSV export.');
      } else {
        setError(detail || 'Error uploading file. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eob-analyzer">
      <div className="analyzer-container">
        <h2>Check My EOB for Savings</h2>
        <p className="subtitle">Upload your Explanation of Benefits to identify potential savings opportunities</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">EOB uploaded successfully! Processing your analysis...</div>}

        <form onSubmit={handleSubmit} className="analyzer-form">
          <div 
            className={`file-upload-area ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="eob-file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.csv,.xlsx"
              className="file-input"
            />
            <label htmlFor="eob-file" className="file-label">
              <span className="upload-icon">📄</span>
              <span className="upload-text">
                {file ? `Selected: ${file.name}` : 'Click to upload or drag and drop'}
              </span>
              <span className="upload-hint">PDF, Images (JPG/PNG), or Spreadsheets (CSV/XLSX)</span>
            </label>
          </div>

          <button type="submit" disabled={loading || !file} className="submit-button">
            {loading ? 'Uploading and analyzing...' : 'Analyze My EOB'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EOBAnalyzer;
