'use client'
import { useState } from 'react';

export default function InspectiePage() {
  const [items, setItems] = useState([{ naam: '', conditie: '', opmerkingen: '', foto: null }]);

  const handleAddItem = () => {
    setItems([...items, { naam: '', conditie: '', opmerkingen: '', foto: null }]);
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Inspectieformulier</h2>
      {items.map((item, i) => (
        <div key={i} className="mb-6 border p-4 rounded-xl bg-white shadow-sm">
          <input
            placeholder="Item (bv. bank, muur)"
            value={item.naam}
            onChange={(e) => handleChange(i, 'naam', e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            placeholder="Conditie"
            value={item.conditie}
            onChange={(e) => handleChange(i, 'conditie', e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Opmerkingen"
            value={item.opmerkingen}
            onChange={(e) => handleChange(i, 'opmerkingen', e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="file"
            onChange={(e) => handleChange(i, 'foto', e.target.files?.[0] || null)}
            className="mb-2"
          />
        </div>
      ))}
      <button
        onClick={handleAddItem}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        Voeg item toe
      </button>
    </div>
  );
}
