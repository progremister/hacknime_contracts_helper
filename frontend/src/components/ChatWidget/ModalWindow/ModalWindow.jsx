import React, { useState, useEffect } from 'react';
import { styles } from "../styles";

function ModalWindow(props) {
    
    const [message, setMessage] = useState("Looking for the syntactical issue");

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setMessage("Syntactically correct!");
            console.log("Checking the general format and rules");
        }, 3000);

        const timer2 = setTimeout(() => {
            setMessage("Error according to the paragraph #24");
        }, 8000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div
            style={{
                ...styles.modalWindow,
                opacity: props.visible ? "1" : "0"
            }}
        >
            {message}
        </div>
    );
}

export default ModalWindow;
