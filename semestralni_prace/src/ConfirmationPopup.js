import React from 'react';
import './App.css';

function ConfirmationPopup({ message, onConfirm, onCancel }) {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>{message}</h2>
                <div className="popup-buttons">
                    <button className="button confirm-button" onClick={onConfirm}>Potvrdit</button>
                    <button className="button cancel-button" onClick={onCancel}>Zrušit</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPopup;
