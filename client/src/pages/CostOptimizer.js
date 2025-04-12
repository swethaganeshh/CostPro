import React, { useState, useRef } from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6496'];

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    background: '#f4f4f9',
    fontFamily: 'Segoe UI, sans-serif'
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  inputGroup: {
    flex: 1,
    minWidth: '250px'
  },
  formControl: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  btn: {
    padding: '10px 25px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease'
  },
  btnHover: {
    backgroundColor: '#0056b3'
  },
  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    marginBottom: '20px'
  },
  cardHover: {
    transform: 'scale(1.02)'
  },
  chartRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  colHalf: {
    flex: 1,
    minWidth: '300px'
  },
  ul: {
    listStyleType: 'none',
    padding: 0
  },
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    borderBottom: '1px solid #eee'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333'
  }
};

const CostOptimizer = () => {
  const [area, setArea] = useState('');
  const [costPerSqFt, setCostPerSqFt] = useState('1000');
  const [result, setResult] = useState(null);
  const reportRef = useRef();

  const handleCalculate = () => {
    const totalCost = parseFloat(area) * parseFloat(costPerSqFt);
    const breakdown = {
      Cement: totalCost * 0.164,
      Sand: totalCost * 0.123,
      Aggregate: totalCost * 0.074,
      Steel: totalCost * 0.246,
      Finishers: totalCost * 0.165,
      Fittings: totalCost * 0.228,
    };
    const materials = {
      Cement: parseFloat((area * 0.4).toFixed(2)),
      Sand: parseFloat((area * 0.816).toFixed(2)),
      Aggregate: parseFloat((area * 0.608).toFixed(2)),
      Steel: parseFloat((area * 4).toFixed(2)),
      Paint: parseFloat((area * 0.18).toFixed(2)),
      Bricks: parseInt(area * 8),
      Flooring: parseFloat((area * 1.3).toFixed(2)),
    };
    setResult({ totalCost, breakdown, materials });
  };

  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Cost-Optimization-Report.pdf");
    });
  };

  const breakdownData = result
    ? Object.entries(result.breakdown).map(([key, value]) => ({
        name: key,
        value: Math.round(value),
      }))
    : [];

  const materialsData = result
    ? Object.entries(result.materials).map(([key, value]) => ({
        name: key,
        quantity: value,
      }))
    : [];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🏗️ Construction Cost Estimator</h2>

      {/* Inputs */}
      <div style={styles.inputRow}>
        <div style={styles.inputGroup}>
          <label>Built-up Area (ft²)</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={styles.formControl}
            placeholder="Enter area in ft²"
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Approx Cost (Per Square Feet)</label>
          <input
            type="number"
            value={costPerSqFt}
            onChange={(e) => setCostPerSqFt(e.target.value)}
            style={styles.formControl}
            placeholder="e.g., 1000"
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button style={styles.btn} onClick={handleCalculate}>Calculate</button>
      </div>

      {/* Report Section */}
       {/* Report Section */}
{result && (
  <div ref={reportRef} style={{ background: '#ffffff', padding: '30px', borderRadius: '10px', fontFamily: "'Segoe UI', sans-serif" }}>
    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Construction Cost Optimization Report</h2>
    <p style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '30px', fontSize: '14px' }}>
      Generated on: {new Date().toLocaleString()}
    </p>

    {/* Summary Section */}
    <div className="card" style={{ marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '10px' }}>Summary</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Built-up Area</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{area} ft²</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Cost per ft²</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{costPerSqFt} Rs.</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Estimated Total Cost</td>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>{result.totalCost.toLocaleString('en-IN')} Rs.</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Cost Breakdown Section */}
    <div className="card" style={{ marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '10px' }}>Cost Breakdown (Thumb Rule)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Component</th>
            <th style={{ textAlign: 'right', padding: '10px' }}>Cost (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(result.breakdown).map(([key, value]) => (
            <tr key={key}>
              <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{key}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'right' }}>{value.toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Material Requirement Section */}
    <div className="card" style={{ marginBottom: '30px' }}>
      <h3 style={{ marginBottom: '10px' }}>Material Requirement for {area} ft²</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Material</th>
            <th style={{ textAlign: 'right', padding: '10px' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(result.materials).map(([key, value]) => (
            <tr key={key}>
              <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{key}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'right' }}>
                {value} {key === 'Bricks' ? 'Pcs' : key === 'Steel' ? 'Kg' : key === 'Paint' ? 'lt' : key === 'Flooring' ? 'ft²' : key === 'Cement' ? 'Bags' : 'Ton'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Charts Section */}
    <div className="chart-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <div className="col-half" style={{ flex: 1, minWidth: '300px' }}>
        <div className="card">
          <h4 style={{ textAlign: 'center' }}>Cost Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={breakdownData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-half" style={{ flex: 1, minWidth: '300px' }}>
        <div className="card">
          <h4 style={{ textAlign: 'center' }}>Material Quantities</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={materialsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
)}


      {/* PDF Download Button */}
      {result && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button style={{ ...styles.btn, backgroundColor: '#28a745' }} onClick={downloadPDF}>
            📥 Download Report as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CostOptimizer;
