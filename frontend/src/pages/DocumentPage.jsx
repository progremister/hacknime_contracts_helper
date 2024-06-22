import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import Header from '../components/Header';


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
                    path: import.meta.env.VITE_MODE === "dev" ? '../node_modules/@pdftron/webviewer/public' : "./webviewer",
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
