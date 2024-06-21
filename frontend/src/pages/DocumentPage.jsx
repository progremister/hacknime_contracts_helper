import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';

const jsonData = {
    COMPANYNAME: 'PDFTron',
    CUSTOMERNAME: 'Andrey Safonov',
    CompanyAddressLine1: '838 W Hastings St 5th floor',
    CompanyAddressLine2: 'Vancouver, BC V6C 0A6',
    CustomerAddressLine1: '123 Main Street',
    CustomerAddressLine2: 'Vancouver, BC V6A 2S5',
    Date: 'Nov 5th, 2021',
    ExpiryDate: 'Dec 5th, 2021',
    QuoteNumber: '134',
    WEBSITE: 'www.pdftron.com',
    billed_items: {
        insert_rows: [
            ['Apples', '3', '$5.00', '$15.00'],
            ['Oranges', '2', '$5.00', '$10.00'],
        ],
    },
    days: '30',
    total: '$25.00',
};

const DocumentPage = () => {
    const viewerRef = useRef(null);
    const webViewerInstance = useRef(null); // New ref to store the WebViewer instance

    useEffect(() => {
        const initializeWebViewer = async () => {
            if (webViewerInstance.current) {
                return; // Prevent creating multiple instances
            }

            const instance = await WebViewer(
                {
                    path: '../node_modules/@pdftron/webviewer/public',
                    initialDoc: '/files/quote.docx',
                },
                viewerRef.current
            );

            webViewerInstance.current = instance; // Store the WebViewer instance

            const { documentViewer } = instance.Core;

            documentViewer.addEventListener('documentLoaded', async () => {
                const doc = documentViewer.getDocument();
                await doc.getDocumentCompletePromise();
                documentViewer.updateView();

                await doc.applyTemplateValues(jsonData);
            });
        };

        initializeWebViewer();
    }, []);

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='bg-blue-400 text-white p-4 text-xl font-bold'>Client App</div>
            <div className='webviewer' ref={viewerRef}></div>
        </div>
    );
};

export default DocumentPage;
