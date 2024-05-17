import './App.css';
import React from "react";



function ticketList({ticketData}) {

    function getSum() {

    }

    return (

                <div className="ticket">
                    <div className="ticket-header">
                        <h2>Objednávka</h2>
                    </div>
                    <div className="ticket-items">
                        <div className="ticket-item">
                            <p>Flavo American coffee x 2</p>
                            <p>8.00</p>
                        </div>
                        <div className="ticket-item">
                            <p>Chicken Salad Croissant x 2</p>
                            <p>12.00</p>
                        </div>
                        <div className="ticket-item">
                            <p>Orange juice fresh x 1</p>
                            <p>10.00</p>
                        </div>
                    </div>
                    <div className="ticket-footer">
                        <div className="ticket-item">
                            <p>Slevy</p>
                            <p>0.80</p>
                        </div>
                        <div className="ticket-item">
                            <p>Daň</p>
                            <p>2.00</p>
                        </div>
                        <div className="ticket-item total">
                            <p>Celkem</p>
                            <p>21.20</p>
                        </div>
                        <button className="button">Uložit</button>
                        <button className="button">Zpoplatnit</button>
                    </div>
                </div>
    );
}

export default ticketList;
