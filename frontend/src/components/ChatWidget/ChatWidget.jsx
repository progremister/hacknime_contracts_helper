// importing external style
import { styles } from './styles';
// import icon
import { BsFillChatFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
//import ModalWindow
import ModalWindow from './ModalWindow/ModalWindow';

function ChatWidget() {
    const [visible, setVisible] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [failureStep, setFailureStep] = useState(-1);
    const widgetRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (widgetRef.current && !widgetRef.current.contains(event.target)) {
                setVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [widgetRef]);

    const handleButtonClick = () => {
        setVisible(true);
        setLoadingStep(1);
        const evenNumbers = [0, 2, 4];
        const randomIndex = Math.floor(Math.random() * evenNumbers.length);
        setFailureStep(evenNumbers[randomIndex]);
    };

    return (
        <div ref={widgetRef}>
            <ModalWindow
                visible={visible}
                setVisible={setVisible}
                loadingStep={loadingStep}
                setLoadingStep={setLoadingStep}
                failureStep={failureStep}
            />

            {!visible && (
                <div onClick={handleButtonClick} style={styles.chatWidget}>
                    <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <BsFillChatFill size={20} color='white' />
                        <span style={styles.chatWidgetText}>Skontrolujte pomocou AI!</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatWidget;
