import React, { useState } from 'react';

const Optimizer = () => {
  const [input, setInput] = useState({ area: '', cementQty: '', steelQty: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const optimizeCost = () => {
    const { cementQty, steelQty } = input;
    const cementRate = 350;  // Original
    const steelRate = 500;   // Original

    const altCementRate = 300; // Suggested cheaper option
    const altSteelRate = 450;

    const originalCost = cementQty * cementRate + steelQty * steelRate;
    const optimizedCost = cementQty * altCementRate + steelQty * altSteelRate;

    setResult({
      original: originalCost,
      optimized: optimizedCost,
      saved: originalCost - optimizedCost
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Times New Roman' }}>
      <h2>💡 Cost Optimization</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Project Area (sq.ft): </label>
        <input name="area" onChange={handleChange} />
      </div>
      <div>
        <label>Cement Qty (in bags): </label>
        <input name="cementQty" type="number" onChange={handleChange} />
      </div>
      <div>
        <label>Steel Qty (in kg): </label>
        <input name="steelQty" type="number" onChange={handleChange} />
      </div>

      <button onClick={optimizeCost} style={{ marginTop: '1rem', padding: '10px', backgroundColor: '#1d2737', color: 'white' }}>
        🔍 Optimize
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h4>📊 Original Cost: ₹{result.original}</h4>
          <h4>✅ Optimized Cost: ₹{result.optimized}</h4>
          <h4>💸 You Save: ₹{result.saved}</h4>
        </div>
      )}
    </div>
  );
};

export default Optimizer;
