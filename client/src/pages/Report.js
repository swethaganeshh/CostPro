// src/pages/Report.js
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Report = () => {
  const data = JSON.parse(localStorage.getItem('userEstimate'));
  const reportRef = useRef();

  const generateRecommendations = () => {
    const recs = [];

    if (data.materialType.toLowerCase().includes("premium")) {
      recs.push("Consider switching to a standard material to reduce costs.");
    }

    if (parseInt(data.laborHours) > 100) {
      recs.push("Optimize labor usage or schedule shifts to avoid overtime.");
    }

    if (parseInt(data.overhead) > 50000) {
      recs.push("Review your overheads to cut unnecessary expenses.");
    }

    if (recs.length === 0) recs.push("Your budget looks optimized! 👍");

    return recs;
  };

  const handleDownloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("Cost_Estimation_Report.pdf");
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Times New Roman' }}>
      <h2>📄 Cost Estimation Report</h2>
      {data ? (
        <div>
          <div
            ref={reportRef}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1.5rem',
              maxWidth: '800px',
              margin: 'auto',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              color: '#000'
            }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Construction Cost Estimation Report</h3>
            <p><strong>🗓️ Generated On:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Total Estimated Cost:</strong> ₹{data.total}</p>
            <ul>
              <li><strong>Dimensions:</strong> {data.dimensions}</li>
              <li><strong>Material Type:</strong> {data.materialType}</li>
              <li><strong>Labor Hours:</strong> {data.laborHours}</li>
              <li><strong>Overhead:</strong> ₹{data.overhead}</li>
            </ul>

            <div style={{ marginTop: '1rem' }}>
              <strong>💡 Recommendations:</strong>
              <ul>
                {generateRecommendations().map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={handleDownloadPDF}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#1d2737',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              📥 Download as PDF
            </button>
          </div>
        </div>
      ) : (
        <p>No data found. Please use the Cost Optimizer first.</p>
      )}
    </div>
  );
};

export default Report;
