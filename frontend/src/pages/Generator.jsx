import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef, useState } from 'react';
import ChatWidget from '../components/ChatWidget/ChatWidget';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons';
import PriceRecommendModal from '../components/PriceRecommendModal';

const initialJsonData = {
    NAZOV_ZAKAZKY: 'Kvetinače',
    SKRATLA: 'Kv.',
    ZDROJE_FINANCOVANIE: 'urad',
    TYP_ZMLUVY: 'zmluva',
    DEADLINE: '25.08.2025',
    TABLE_2: {
        insert_rows: [
            ['1', 'Dokument 1', '1'],
            ['2', 'Dokument 2', '9'],
            ['3', 'Dokument 3', '21'],
        ],
    },
    TABLE_3: {
        insert_rows: [
            ['1', 'Subdodavatel 1', '1234', '10%', 'Predmet 1'],
            ['2', 'Subdodavatel 2', '1234', '10%', 'Predmet 3'],
            ['3', 'Subdodavatel 3', '1234', '10%', 'Predmet 5'],
        ],
    },
    OSOBA_1: 'Oleksandr Kalenskyy',
    MANAZER_VO: 'Kyrylo Bulyk',
    OSOBA_2: 'Dmytro Kolosovskyi',
    DATUM: '22.06.2024',
    ODKAZ: 'https://www.google.com',
    CPV_1: '1',
    CPV_2: '2',
    HODNOTA: '20',
    POPIS: 'pekny kvetinac',
    TRH: 'trhu kvetinacov',
    TABLE: {
        insert_rows: [
            ['Kventinac', '1', '1', '20%', '10', '20', '30', '40'],
            ['Kventinac', '1', '1', '20%', '10', '20', '30', '40'],
        ],
    },
    MESTO: 'Bratislave',
    MENO_PRIEZVISKO: 'Dmytro Kolosovskyi',
};

const Generator = () => {
    const viewerRef = useRef(null);
    const webViewerInstance = useRef(null);
    const [formData, setFormData] = useState(initialJsonData);
    const [showRecommendedPrice, setShowRecommendedPrice] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const initializeWebViewer = async () => {
            if (webViewerInstance.current) {
                return;
            }

            const instance = await WebViewer(
                {
                    path: import.meta.env.VITE_MODE === "dev" ? '../node_modules/@pdftron/webviewer/public' : "./webviewer",
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

    const handleBilledItemsChange = (tableKey, e, rowIndex, colIndex) => {
        const value = e.target.value;
        const updatedRows = formData[tableKey].insert_rows.map((row, rIndex) =>
            rIndex === rowIndex
                ? row.map((col, cIndex) => (cIndex === colIndex ? value : col))
                : row
        );
        setFormData((prevData) => ({
            ...prevData,
            [tableKey]: { insert_rows: updatedRows },
        }));
    };

    const handleAddRow = (tableKey) => {
        const numColumns = formData[tableKey].insert_rows[0].length;
        const newRow = Array(numColumns).fill('');
        const updatedRows = [...formData[tableKey].insert_rows, newRow];
        setFormData((prevData) => ({
            ...prevData,
            [tableKey]: { insert_rows: updatedRows },
        }));
    };

    const handleRemoveRow = (tableKey, rowIndex) => {
        const updatedRows = formData[tableKey].insert_rows.filter(
            (_, rIndex) => rIndex !== rowIndex
        );
        setFormData((prevData) => ({
            ...prevData,
            [tableKey]: { insert_rows: updatedRows },
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

    const handleQuestionClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='w-full h-full flex flex-col relative'>
        <Header />
        <div className='w-full h-full lg:flex lg:flex-row'>
        <form onSubmit={handleSubmit} className='p-4 max-h-full overflow-y-scroll w-full lg:w-1/2'>
          {Object.keys(initialJsonData).map((key) => (
            <>
              {!key.includes('TABLE') && (
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
                  <div className="flex justify-between items-center">
                    <label className='block text-gray-700 font-bold'>{key}:</label>
                    <div className='mb-4 flex gap-3 items-center'>
                      <label className='block text-gray-700 font-bold mb-1 lh-[1.2]'>AI odporúčané ceny:</label>
                      <input
                        type='checkbox'
                        checked={showRecommendedPrice}
                        onChange={(e) => setShowRecommendedPrice(e.target.checked)}
                        className='w-4 h-4 border border-gray-300 rounded'
                      />
                    </div>
                  </div>
                  {formData[key].insert_rows.map((row, rowIndex) => (
                    <div key={rowIndex} className='flex flex-col space-y-2 mt-1'>
                      <div className='flex items-center space-x-2'>
                        {row.map((item, colIndex) => (
                          <input
                            key={colIndex}
                            type='text'
                            value={item}
                            onChange={(e) => handleBilledItemsChange(key, e, rowIndex, colIndex)}
                            className='w-full border border-gray-300 p-2 rounded'
                          />
                        ))}
                        <button
                          type='button'
                          className='text-blue-400 hover:text-blue-600 px-2 py-1 rounded'
                          onClick={() => handleRemoveRow(key, rowIndex)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      {showRecommendedPrice && (
                        <div className='text-gray-700 items-center flex gap-1'>
                          Odporúčaná cena: 
                          <div className='flex hover:scale-[1.10] hover:cursor-pointer gap-1 items-center'
                            onClick={handleQuestionClick}>
                                <span className='font-bold'>11.98€</span>
                                <FontAwesomeIcon icon={faQuestion} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type='button'
                    className='bg-blue-400 text-white px-2 py-1 mt-2 rounded hover:bg-blue-600'
                    onClick={() => handleAddRow(key)}
                  >
                    Prídať riadok
                  </button>
                </div>
              )}
            </>
          ))}
          <button type='submit' className='bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded'>Generovať</button>
        </form>
        <div className='webviewer w-full lg:w-1/2' ref={viewerRef}></div>
      </div>
      <ChatWidget />
      <PriceRecommendModal show={isModalOpen} onClose={handleModalClose} />
    </div>

    );
};

export default Generator;
