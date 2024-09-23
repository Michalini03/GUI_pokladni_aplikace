import React, { useState } from 'react';
import "./App.css";
import ConfirmationPopup from './ConfirmationPopup';

export default function Souhrn({ fullCash, fullCard, fullCardDiscount, fullCashDiscount, fullCashNoDph, fullCardNoDph, cardTicketAmount, cashTicketAmount, soldItems , resetFunction}) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClosure = () => {
        // Logika pro uzávěrku
        console.log("Uzávěrka provedena!");
        setIsPopupOpen(false);
        resetFunction();
    };

    return (
        <div className="body-souhrn">
            <div className="container-souhrn">
                <div className="section-souhrn">
                    <p className="p-souhrn" style={{ fontSize: 30, margin: 10 }}>
                        Celkem: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                        fullCash + fullCard + fullCardDiscount + fullCashDiscount
                    )}
                    </p>
                </div>
                <div className="row-souhrn">
                    <div className="section-souhrn">
                        <h1 className="h1-souhrn">Celkem s poukázky</h1>
                        <p className="p-souhrn">Celková hotovost: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCash + fullCashDiscount
                        )} </p>
                        <p className="p-souhrn">Celková platba kartou: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCard + fullCardDiscount
                        )}</p>
                    </div>
                    <div className="section-souhrn">
                        <h1 className="h1-souhrn">Celkem bez poukázek:</h1>
                        <p className="p-souhrn">Celková hotovost: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCash,
                        )}</p>
                        <p className="p-souhrn">Celková platba kartou: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCard,
                        )}</p>
                    </div>
                    <div className="section-souhrn">
                        <h1 className="h1-souhrn">Celkem bez DPH:</h1>
                        <p className="p-souhrn">Celkem hotovost: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCashNoDph,
                        )}</p>
                        <p className="p-souhrn">Celkem platba kartou: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCardNoDph,
                        )}</p>
                    </div>
                </div>
                <div className="row-souhrn">
                    <div className="section-souhrn">
                        <h1 className="h1-souhrn">Poukázky</h1>
                        <p className="p-souhrn">Hotovost: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCashDiscount,
                        )}</p>
                        <p className="p-souhrn">Platba kartou: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCardDiscount,
                        )}</p>
                        <p className="p-souhrn">Celkem: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            fullCashDiscount + fullCardDiscount,
                        )}</p>
                    </div>
                    <div className="section-souhrn">
                        <h1 className="h1-souhrn">Počet prodejů:</h1>
                        <p className="p-souhrn">Hotovost: {cashTicketAmount} </p>
                        <p className="p-souhrn">Platba kartou: {cardTicketAmount} </p>
                        <p className="p-souhrn">Celkem: {cardTicketAmount + cashTicketAmount} </p>
                    </div>
                </div>
                <button className="button" onClick={() => setIsPopupOpen(true)}>Uzávěrka</button>
            </div>
            {isPopupOpen && (
                <ConfirmationPopup
                    message="Opravdu chcete provést uzávěrku?"
                    onConfirm={handleClosure}
                    onCancel={() => setIsPopupOpen(false)}
                />
            )}
        </div>
    );
}