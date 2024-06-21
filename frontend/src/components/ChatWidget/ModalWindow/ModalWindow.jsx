import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { MdError } from 'react-icons/md';
import { styles } from '../styles';

const messages = [
    'Uploading document...',
    'Analyzing document...',
    'Completed Analyzing',
    'Checking for compliance...',
    'Completed compliance',
    'Finalizing document review...',
    'Document is approved!',
];

function ModalWindow({ visible, setVisible, loadingStep, setLoadingStep, failureStep }) {
    useEffect(() => {
        if (loadingStep === 6 || loadingStep === failureStep) {
            setTimeout(() => {
                setVisible(false);
            }, 5000);
            return;
        }
        if (loadingStep > 0 && loadingStep < messages.length) {
            const isFinalStep = loadingStep === messages.length - 1;
            const isFailureStep = loadingStep === failureStep;
            const timer = setTimeout(
                () => {
                    if (!isFailureStep) {
                        setLoadingStep(loadingStep + 1);
                    }
                },
                isFinalStep || isFailureStep ? 3000 : 2000
            );

            return () => clearTimeout(timer);
        }
    }, [loadingStep, setLoadingStep, failureStep]);

    const isLoading = loadingStep % 2 !== 0 || loadingStep === 0;
    const isFailure = loadingStep === failureStep;

    return (
        <div style={{ ...styles.modalWindow, opacity: visible ? '1' : '0' }}>
            <div className='flex gap-2 '>
                {isLoading ? (
                    <AiOutlineLoading3Quarters className='animate-spin' size={24} color='gray' />
                ) : isFailure ? (
                    <MdError size={24} color='red' />
                ) : (
                    <BsCheckCircle size={24} color='green' />
                )}
                <span style={{ marginLeft: '10px' }}>
                    {isFailure
                        ? 'Process failed: does not meet all requirements'
                        : messages[loadingStep]}
                </span>
            </div>
        </div>
    );
}

export default ModalWindow;
