'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Item = {
  naam: string;
  conditie: string;
  opmerkingen: string;
  foto: File | null;
};

export default function InspectiePage() {
  const [items, setItems] = useState<Item[]>([{ naam: '', conditie: '', opmerkingen: '', foto: null }]);
  const [currentStep, setCurrentStep] = useState(0);

  const currentItem = items[currentStep];

  const handleChange = (field: keyof Item, value: any) => {
    const updated = [...items];
    updated[currentStep][field] = value;
    setItems(updated);
  };

  const addNewItem = () => {
    setItems([...items, { naam: '', conditie: '', opmerkingen: '', foto: null }]);
    setCurrentStep(items.length); // navigeer naar nieuw item
  };

  const handleDeleteItem = () => {
    if (items.length === 1) return; // minimaal 1 item moet blijven

    const updated = [...items];
    updated.splice(currentStep, 1);

    setItems(updated);

    // Zorg dat je binnen grenzen blijft
    if (currentStep >= updated.length) {
      setCurrentStep(updated.length - 1);
    }
  };

  const nextItem = () => {
    if (currentStep < items.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevItem = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const exportPDF = async () => {
    const form = document.getElementById('inspectie-review');
    if (!form) return;

    const canvas = await html2canvas(form);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('inspectie.pdf');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-6 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          🧾 Inspectieformulier
        </h1>

        <div className="mb-4 text-center text-gray-600">
          Item {currentStep + 1} van {items.length}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Voorwerp</label>
            <input
              value={currentItem.naam}
              onChange={(e) => handleChange('naam', e.target.value)}
              placeholder="bv. Kast, muur"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Conditie</label>
            <input
              value={currentItem.conditie}
              onChange={(e) => handleChange('conditie', e.target.value)}
              placeholder="bv. Beschadigd, goed"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Opmerkingen</label>
            <textarea
              value={currentItem.opmerkingen}
              onChange={(e) => handleChange('opmerkingen', e.target.value)}
              placeholder="Extra info over het item"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange('foto', e.target.files?.[0] || null)}
              className="text-sm"
            />
            {currentItem.foto && (
              <img
                src={URL.createObjectURL(currentItem.foto)}
                alt="Preview"
                className="mt-3 w-40 h-40 object-cover rounded-xl border"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={prevItem}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-lg ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            ⬅️ Vorige
          </button>

          <button
            onClick={nextItem}
            disabled={currentStep === items.length - 1}
            className={`px-4 py-2 rounded-lg ${
              currentStep === items.length - 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            Volgende ➡️
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={addNewItem}
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
          >
            ➕ Voeg nieuw item toe
          </button>

          <button
            onClick={handleDeleteItem}
            disabled={items.length === 1}
            className={`w-full py-3 rounded-xl ${
              items.length === 1
                ? 'bg-red-200 text-red-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            🗑️ Verwijder huidig item
          </button>

          <button
            onClick={exportPDF}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            📄 Exporteer als PDF
          </button>
        </div>
      </div>

      {/* Verborgen reviewzone voor PDF */}
      <div id="inspectie-review" className="hidden">
        <h2>Inspectierapport</h2>
        {items.map((item, i) => (
          <div key={i}>
            <p><strong>Item:</strong> {item.naam}</p>
            <p><strong>Conditie:</strong> {item.conditie}</p>
            <p><strong>Opmerkingen:</strong> {item.opmerkingen}</p>
            {item.foto && <img src={URL.createObjectURL(item.foto)} style={{ width: '100px' }} />}
            <hr />
          </div>
        ))}
      </div>
    </main>
  );
}
