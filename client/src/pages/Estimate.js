import { useState } from 'react';
import axios from 'axios';

function Estimate() {
  const [name, setName] = useState('');
  const [materials, setMaterials] = useState([{ name: '', quantity: 0, rate: 0 }]);
  const [dimensions, setDimensions] = useState({ length: 0, width: 0, height: 0 });
  const [laborHours, setLaborHours] = useState(0);

  const handleAddMaterial = () => {
    setMaterials([...materials, { name: '', quantity: 0, rate: 0 }]);
  };

  const handleMaterialChange = (i, field, value) => {
    const newMaterials = [...materials];
    newMaterials[i][field] = value;
    setMaterials(newMaterials);
  };

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/api/projects', {
      name, dimensions, materials, laborHours
    });
    alert("Estimated cost: ₹" + res.data.totalCost);
  };

  return (
    <div>
      <h2>Construction Estimate</h2>
      <input placeholder="Project Name" onChange={(e) => setName(e.target.value)} />
      <div>
        <input placeholder="Length" onChange={(e) => setDimensions({ ...dimensions, length: +e.target.value })} />
        <input placeholder="Width" onChange={(e) => setDimensions({ ...dimensions, width: +e.target.value })} />
        <input placeholder="Height" onChange={(e) => setDimensions({ ...dimensions, height: +e.target.value })} />
      </div>
      {materials.map((mat, i) => (
        <div key={i}>
          <input placeholder="Material Name" onChange={(e) => handleMaterialChange(i, 'name', e.target.value)} />
          <input placeholder="Quantity" type="number" onChange={(e) => handleMaterialChange(i, 'quantity', +e.target.value)} />
          <input placeholder="Rate" type="number" onChange={(e) => handleMaterialChange(i, 'rate', +e.target.value)} />
        </div>
      ))}
      <button onClick={handleAddMaterial}>Add Material</button>
      <input placeholder="Labor Hours" onChange={(e) => setLaborHours(+e.target.value)} />
      <button onClick={handleSubmit}>Estimate Cost</button>
    </div>
  );
}

export default Estimate;
