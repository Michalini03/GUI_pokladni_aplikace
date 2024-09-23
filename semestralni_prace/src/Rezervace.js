import React from 'react';
import "./App.css";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar, DatePicker, TimePicker} from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import { format } from 'date-fns';
import Box from "@mui/material/Box";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export default function Rezervace({handleUpdate, reservationList}) {
    const [valueDate, setValueDate] = React.useState();
    const [valueTime, setValueTime] = React.useState();
    const [calendarValue, setCalendarValue] = React.useState();
    const [name, setName] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [showedReservations, setShowedReservations] = React.useState(reservationList)

    // Vybraný řádek v tabulce
    const [selectedRow, setSelectedRow] = React.useState(null);

    const columns = [
        {
            field: 'name',
            headerName: 'Jméno rezervujícího:',
            width: 300,
            height: 100,
            editable: true,
        },
        {
            field: 'amount',
            headerName: 'Počet osob:',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'date',
            headerName: 'Datum:',
            valueFormatter: (value) => { if (value) {
                return dayjs(value).format('DD/MM/YY');}
                return '';
            },
            type: 'date',
            width: 110,
            editable: true,
        },
        {
            field: 'time',
            headerName: 'Čas:',
            valueFormatter: (params) => { if (params) {
                return format(new Date(params), "HH:mm");}
                return '';
            },
            type: 'date',
            width: 110,
            editable: true,
        },
    ];

    // Funkce pro vytvoření rezervace
    function createReservation() {
        let id = 0
        if(name == "") {
            alert("Zadejte jméno rezervovaného!")
        }
        else if(amount <= 0) {
            alert("Zadejte validní počet osob!")
        }
        else if(valueDate < dayjs() || valueDate === undefined) {
            alert("Zadejte validní datum")
        }
        else if(valueTime === undefined) {
            alert("Zadejte validní čas!")
        }
        else {
            if(reservationList.length > 0) {
                id = reservationList[reservationList.length-1].id + 1
            }
            else {
                id = 1
            }
        let updatedReservationList = [...reservationList, {id: id, name: name, amount: amount, date: valueDate, time: valueTime}];
        setShowedReservations(updatedReservationList)
        setName("");
        setAmount(0);
        handleUpdate(updatedReservationList)
        }
    }

    function filterData(showedDate) {
        let newReservations = []
        for(let x in reservationList) {
            if(reservationList[x].date.isSame(showedDate, "day")) {
                newReservations.push(reservationList[x])
            }
        }
        console.log(newReservations)
        setShowedReservations(newReservations)
    }

    // Smazání rezervace
    function deleteReservations() {
        let newReservations = []
        for (let x in reservationList) {
            if (reservationList[x].id != selectedRow[0]) {
                newReservations.push(reservationList[x])
            }
        }
        setShowedReservations(newReservations)
        handleUpdate(newReservations)
    }

    return (
        <div className="rezervace-container">
            <div className="rezervace-header">
                <div className="rezervace-form-container">
                    <div className="rezervace-form-item">
                        <label>Jméno rezervujícího: </label>
                        <br />
                        <input type="text" value={name} style={{ height: 40 }} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="rezervace-form-item">
                        <label>Počet osob: </label>
                        <br />
                        <input type="number" value={amount} style={{ height: 40 }} onChange={e => setAmount(e.target.value)} />
                    </div>
                    <div className="rezervace-form-item">
                        <label>Datum: </label>
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={valueDate}
                                format={"DD/MM/YY"}
                                onChange={(value) => setValueDate(value)}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="rezervace-form-item">
                        <label>Čas: </label>
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                value={valueTime}
                                ampm={false}
                                format={"HH:mm"}
                                onChange={(value) => setValueTime(value)}
                            />
                        </LocalizationProvider>
                    </div>
                    <button className="button" style={{ width: "8%", borderRadius: 0 }} onClick={createReservation}>
                        Přidat
                    </button>
                </div>
            </div>
            <div className="rezervace-main-content">
                <div className="rezervace-table-container">
                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={showedReservations}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 15,
                                    },
                                },
                            }}
                            pageSizeOptions={[15]}
                            onRowSelectionModelChange={(newSelect) => setSelectedRow(newSelect)}
                        />
                    </Box>
                </div>
                <div className="rezervace-calendar-container">
                    <button className="rezervace-cancel-button" style={{margin: "3%"}} onClick={() => deleteReservations()}>
                        Zrušit rezervaci
                    </button>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            className="rezervace-calendar"
                            value={calendarValue}
                            onChange={(newValue) => {
                                setCalendarValue(newValue);
                                filterData(newValue)
                            }}
                        />
                    </LocalizationProvider>
                    <button onClick={() => setShowedReservations(reservationList)} className="rezervace-cancel-button" style={{margin: "1%", width: "15%"}}>
                        <FilterAltOffIcon/>
                    </button>
                </div>
            </div>
        </div>
    );
}