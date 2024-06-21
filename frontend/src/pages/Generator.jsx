import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef, useState } from 'react';
import ChatWidget from '../components/ChatWidget/ChatWidget';

const initialJsonData = {
  "NAZOV_ZAKAZKY": 'Kvetinače',
  "SKRATLA": "Kv.",
  "ZDROJE_FINANCOVANIE": "urad",
  "TYP_ZMLUVY": "zmluva",
  "DEADLINE": "25.08.2025",
  "TABLE_2": {
    insert_rows: [
        ["1", "Dokument 1", "1"],
        ["2", "Dokument 2", "9"],
        ["3", "Dokument 3", "21"],
    ]
  },
  "TABLE_3": {
    insert_rows: [
      ["1", "Subdodavatel 1", "1234", "10%", "Predmet 1"],
      ["2", "Subdodavatel 2", "1234", "10%", "Predmet 3"],
      ["3", "Subdodavatel 3", "1234", "10%", "Predmet 5"],
    ]
  },
  "OSOBA_1": 'Oleksandr Kalenskyy',
  "MANAZER_VO": 'Kyrylo Bulyk',
  "OSOBA_2": 'Dmytro Kolosovskyi',
  "DATUM": "22.06.2024",
  "ODKAZ": "https://www.google.com",
  "CPV_1": "1",
  "CPV_2": "2",
  "HODNOTA": "20",
  "POPIS": "pekny kvetinac",
  "TRH": "trhu kvetinacov",
  "TABLE": {
    insert_rows: [
        ["Kventinac", "1", "1", "20%", "10", "20", "30", "40"],
        ["Kventinac", "1", "1", "20%", "10", "20", "30", "40"]
    ]
  },
  "MESTO": "Bratislave",
  "MENO_PRIEZVISKO": "Dmytro Kolosovskyi"
};

const Generator = () => {
  const viewerRef = useRef(null);
  const webViewerInstance = useRef(null);
  const [formData, setFormData] = useState(initialJsonData);

  useEffect(() => {
    const initializeWebViewer = async () => {
      if (webViewerInstance.current) {
        return;
      }

      const instance = await WebViewer(
        {
          path: '../node_modules/@pdftron/webviewer/public',
          initialDoc: '/files/example1.docx',
        },
        viewerRef.current
      );

      webViewerInstance.current = instance;

      const { documentViewer } = instance.Core;

      documentViewer.addEventListener('documentLoaded', async () => {
        const doc = documentViewer.getDocument();
        await doc.getDocumentCompletePromise();
        documentViewer.updateView();
      });
    };

    initializeWebViewer();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBilledItemsChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    const updatedRows = formData.billed_items.insert_rows.map((row, rIndex) =>
      rIndex === rowIndex ? row.map((col, cIndex) => (cIndex === colIndex ? value : col)) : row
    );
    setFormData((prevData) => ({
      ...prevData,
      billed_items: { insert_rows: updatedRows },
    }));
  };

  const handleAddRow = () => {
    const updatedRows = [...formData.billed_items.insert_rows, ['', '', '', '']];
    setFormData((prevData) => ({
      ...prevData,
      billed_items: { insert_rows: updatedRows },
    }));
  };

  const handleRemoveRow = (rowIndex) => {
    const updatedRows = formData.billed_items.insert_rows.filter((_, rIndex) => rIndex !== rowIndex);
    setFormData((prevData) => ({
      ...prevData,
      billed_items: { insert_rows: updatedRows },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const instance = webViewerInstance.current;
    if (instance) {
      const { documentViewer } = instance.Core;
      const doc = documentViewer.getDocument();
      doc.applyTemplateValues(formData);
    }
  };

  const startAiAnalyze = () => {

  } 

  return (
    <div className='w-full h-full flex flex-col relative'>
      <div className='w-full h-15 px-2 py-4  bg-indigo-400 text-[2.2rem] text-white font-bold'>Contract Generator</div>
      <div className="w-full h-full flex">
        <form onSubmit={handleSubmit} className='p-4 max-h-full overflow-y-scroll w-1/2'>
          {Object.keys(initialJsonData).map((key) => (
            <>
              {key !== 'TABLE' && (
                <div key={key} className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-1'>{key}:</label>
                  <input
                    type='text'
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className='w-full border border-gray-300 p-2 mt-1 rounded'
                  />
                </div>
              )}
              {key.includes('TABLE') && (
                <div key={key} className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-1'>{key}:</label>
                  {formData[key].insert_rows.map((row, rowIndex) => (
                    <div key={rowIndex} className='flex items-center space-x-2 mt-1'>
                      {row.map((item, colIndex) => (
                        <input
                          key={colIndex}
                          type='text'
                          value={item}
                          onChange={(e) => handleBilledItemsChange(e, rowIndex, colIndex)}
                          className='w-full border border-gray-300 p-2 rounded'
                        />
                      ))}
                      <button
                        type='button'
                        className='bg-red-500 text-white px-2 py-1 rounded'
                        onClick={() => handleRemoveRow(rowIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    className='bg-green-500 text-white px-2 py-1 mt-2 rounded'
                    onClick={handleAddRow}
                  >
                    Add Row
                  </button>
                </div>
              )}
            </>
          ))}
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Generate</button>
        </form>
        <div className='webviewer w-1/2' ref={viewerRef}></div>
      </div>
      <ChatWidget />
      
    </div>
  );
};

export default Generator;
