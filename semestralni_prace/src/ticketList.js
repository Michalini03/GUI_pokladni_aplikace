import './App.css';
import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ticketList({ticketData, priceValue, priceValueNoDph, hooverDiscount, hooverDelete, hooverAmount, hooverSale}) {
    const columns = [

        {
            field: 'name',
            headerName: 'Název položky:',
            width: 190,
            height: 100,
            editable: false,
        },
        {
            field: "amount",
            headerName: "Množství:",
            type: "number",
            width: 80,
            editable: true,
            valueFormatter: (value) => {

                return `${value}x`;
            },

        },
        {
            field: 'dph',
            headerName: 'DPH:',
            type: 'number',
            width: 70,
            editable: false,
            valueGetter: (value) => {
                if (!value) {
                    return value;
                }
                return value * 100;
            },
            valueFormatter: (value) => {
                if (value == null) {
                    return '';
                }
                return `${value.toLocaleString()} %`;
            },
        },
        {
            field: 'price_dph',
            headerName: 'Cena:',
            type: "number",
            width: 150,
            editable: false,
            valueFormatter: (value) => {
                if (value == null) {
                    return '';
                }
                return `${Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(value)}`

                },

        },
        {
            field: 'add',
            headerName: "",
            width: 50,
            renderCell: (cellValues) => {
                return <button onClick={(event) => deleteFromTicket(cellValues.id)} className={"button"} style={{width: "100%"}}>x</button>
            }
        },
    ];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [discount, setDiscount] = React.useState(0);

    const handleDiscountChange = (event) => {
        setDiscount(event.target.value);
        hooverDiscount(event.target.value);
    };

    const deleteFromTicket = (itemID) => {
        let updatedItems = [];
        for (let i = 0; i < ticketData.length; i++) {
            if (ticketData[i].id != itemID) {
                updatedItems.push(ticketData[i])
            }
        }
        hooverDelete(updatedItems)
    }

    const handleUpdate = (newData) => {
        console.log(newData)
        const updatedData = [...ticketData]; // vytvořit kopii pole dat
        const index = updatedData.findIndex(row => row.id === newData.id); // najít index původního řádku
        updatedData[index] = newData;
        hooverAmount(updatedData)
    };

    return (
                <div className="ticket" style={{color: "black"}}>
                    <div className="ticket-header">
                        <h4 style={{fontSize: 32.5, margin:10}}>Objednávka</h4>
                    </div>
                    <div className="ticket-items">
                        <div className="ticket-item">
                            <Box sx={{ height: 450, width: '100%' }}>
                                <DataGrid
                                    rows={ticketData}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[10]}
                                    disableSelectionOnClick
                                    processRowUpdate={(newVal, oldVal) => {

                                            handleUpdate(newVal);
                                            return newVal
                                    }
                                }
                                />
                            </Box>
                        </div>
                    </div>
                    <div className="ticket-footer">
                        <div className="ticket-item" style={{padding: 0}}>
                            <p style={{
                                display: "grid",
                                placeItems: "center",
                                fontSize: 25,
                                /* Vertikální a horizontální zarovnání na střed */}}>Slevy</p>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={discount}
                                    onChange={handleDiscountChange}
                                    label="Sleva"
                                >
                                    <MenuItem value={0}>Bez slevy</MenuItem>
                                    <MenuItem value={100}>{Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                                        100
                                    )}</MenuItem>
                                    <MenuItem value={200}>{Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                                        200
                                    )}</MenuItem>
                                    <MenuItem value={500}>{Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                                        500
                                    )}</MenuItem>
                                    <MenuItem value={1000}>{Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                                        1000
                                    )}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="ticket-item total">
                            <p style={{fontSize: 20}}>Celkem bez DPH</p>
                            <p style={{fontSize: 20}}>{Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                                priceValueNoDph,
                            )}</p>
                        </div>
                        <div className="ticket-item total" style={{height: 30, fontSize: 30}}>
                            <p>Celkem</p>
                            <p>{Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                                priceValue,
                            )}</p>
                        </div>
                        <div style={{height: "70px"}}>
                            <button className="button" style={{marginRight: 5, height: "70%"}} onClick={() => {
                                const x = discount;
                                setDiscount(0);
                                hooverSale("cash", x)}}>Platba Hotově</button>
                            <button className="button" style={{marginLeft: 5, height: "70%", marginTop: "3%" }} onClick={() => {
                                const x = discount;
                                setDiscount(0);
                                hooverSale("card", x)}}>Platba Kartou</button>
                        </div>
                    </div>
                </div>
    );
}

export default ticketList;
