import React, { useState } from 'react';

const denominations = [
    { label: '5000 Kč', value: 5000 },
    { label: '2000 Kč', value: 2000 },
    { label: '1000 Kč', value: 1000 },
    { label: '500 Kč', value: 500 },
    { label: '200 Kč', value: 200 },
    { label: '100 Kč', value: 100 },
    { label: '50 Kč', value: 50 },
    { label: '20 Kč', value: 20 },
    { label: '10 Kč', value: 10 },
    { label: '5 Kč', value: 5 },
    { label: '2 Kč', value: 2 },
    { label: '1 Kč', value: 1 },
];


export default function Calculator() {
    const [counts, setCounts] = useState(
        denominations.reduce((acc, curr) => {
            // Pro každou hodnotu v denominations přidáme klíč s hodnotou 0 do akumulátoru
            acc[curr.value] = 0;
            return acc;
        }, {})
    );

    // Funkce pro změnu počtu mincí/bankovek
    const handleChange = (value, count) => {
        setCounts({
            ...counts,
            [value]: count, // Aktualizujeme konkrétní hodnotu mincí/bankovek
        });
    };

    // Vypočítáme celkovou hodnotu všech mincí/bankovek
    const total = denominations.reduce((sum, { value }) => {
        return sum + value * counts[value];
    }, 0);

    return (
        <div className="mincovka-container">
            <div className="section-souhrn">
            <form className="mincovka-form">
                {denominations.map(({ label, value }) => (
                    <label key={value} className="mincovka-label">
                        {label}:
                        <input
                            type="number"
                            value={counts[value]}
                            onChange={(e) => handleChange(value, parseInt(e.target.value || 0))}
                            className="mincovka-input"
                            min="0"
                        />
                    </label>
                ))}
            </form>
            </div>
            <div className="section-souhrn" style={{marginBottom: 0, padding: 0}}>
            <p className={"mincovka-total"} style={{fontSize: 38, margin: 10}}>Celkem: {Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                total
            )}; </p>
            </div>
        </div>
    );
}

