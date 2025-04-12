// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const Dashboard = () => {
  const [previousData, setPreviousData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userEstimate"));
    setPreviousData(data);
  }, []);

  const chartData = previousData ? [
    { name: 'Materials', value: previousData.materials },
    { name: 'Labor', value: previousData.labor },
    { name: 'Overheads', value: previousData.overhead },
  ] : [];

  const comparisonData = previousData?.optimized ? [
    { name: 'Total Cost', Original: previousData.total, Optimized: previousData.optimized.total },
    { name: 'Materials', Original: previousData.materials, Optimized: previousData.optimized.materials },
    { name: 'Labor', Original: previousData.labor, Optimized: previousData.optimized.labor },
    { name: 'Overheads', Original: previousData.overhead, Optimized: previousData.optimized.overhead },
  ] : [];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Times New Roman', backgroundColor: '#f4f6f8', minHeight: '90vh' }}>
      <h1 style={{ color: '#1d2737' }}>📋 Dashboard</h1>

      {previousData ? (
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
          <h2>Welcome Back!</h2>
          <p>Your recent construction estimate:</p>

          <table style={{ width: '100%', marginBottom: '1.5rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1d2737', color: 'white' }}>
                <th style={{ padding: '10px' }}>Component</th>
                <th style={{ padding: '10px' }}>Cost (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '10px' }}>Materials</td><td>₹{previousData.materials}</td></tr>
              <tr style={{ backgroundColor: '#f0f0f0' }}><td style={{ padding: '10px' }}>Labor</td><td>₹{previousData.labor}</td></tr>
              <tr><td style={{ padding: '10px' }}>Overheads</td><td>₹{previousData.overhead}</td></tr>
              <tr style={{ fontWeight: 'bold', backgroundColor: '#e2f0ff' }}>
                <td style={{ padding: '10px' }}>Total Estimated Cost</td>
                <td>₹{previousData.total}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ width: '100%', height: 300, marginBottom: '2rem' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {previousData.optimized && (
            <>
              <h3 style={{ marginTop: '2rem' }}>💡 Optimized Cost Comparison</h3>
              <p>Here's how optimization reduced your construction budget:</p>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Original" fill="#8884d8" />
                    <Bar dataKey="Optimized" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
          <h2>Welcome to <span style={{ color: '#0088FE' }}>ConsPro</span> | <span style={{ color: '#00C49F' }}>Budget Calculator</span></h2>
          <p>🎯 Ready to start your construction budgeting journey?</p>
          <p>Head over to the <strong>Cost Optimizer</strong> page to begin your estimate!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
