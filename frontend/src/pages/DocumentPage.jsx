import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import Header from '../components/Header';

// const jsonData = {
//     "NAZOV_ZAKAZKY_1": 'Kvetinače',
//     "OSOBA_1": 'Dmytro Kolosovskyi',
//     "MANAZER_VO": 'Dmytro Kolosovskyi',
//     "OSOBA_2": 'Dmytro Kolosovskyi',
//     "DATUM_1": "22.06.2024",
//     "NAZOV_ZAKAZKY_2": 'Kvetinače',
//     "DATUM_2": "22.06.2024",
//     "ODKAZ_1": "https://www.google.com",
//     "ODKAZ_2": "https://www.google.com",
//     "NAZOV_ZAKAZKY_3": 'Kvetinače',
//     "CPV_1": "1",
//     "CPV_2": "2",
//     "HODNOTA_1": "20",
//     "TRH_1": "trhu kvetinacov",
//     "TABLE": {
//       insert_rows: [
//           ["Kventinac", "1", "1", "20%", "10", "20", "30", "40"],
//           ["Kventinac", "1", "1", "20%", "10", "20", "30", "40"]
//       ]
//     },
//     "MESTO": "Bratislave",
//     "DATUM_3": "22.06.2024",
//     "MENO_PRIEZVISKO_1": "Dmytro Kolosovskyi"
//   };
  

const DocumentPage = () => {
    const viewerRef = useRef(null);
    const webViewerInstance = useRef(null); // New ref to store the WebViewer instance

    useEffect(() => {
        document.title = `${import.meta.env.VITE_APP_NAME} | Template Viewer`;
        const initializeWebViewer = async () => {
            if (webViewerInstance.current) {
                return; // Prevent creating multiple instances
            }

            const instance = await WebViewer(
                {
                    path: '../node_modules/@pdftron/webviewer/public',
                    initialDoc: '/files/example1.docx',
                },
                viewerRef.current
            );

            webViewerInstance.current = instance; // Store the WebViewer instance

            const { documentViewer } = instance.Core;

            documentViewer.addEventListener('documentLoaded', async () => {
                const doc = documentViewer.getDocument();
                await doc.getDocumentCompletePromise();
                documentViewer.updateView();
            });
        };

        initializeWebViewer();
    }, []);

    return (
        <div className='w-full h-full flex flex-col'>
            <Header />
            <div className='webviewer' ref={viewerRef}></div>
        </div>
    );
};

export default DocumentPage;
