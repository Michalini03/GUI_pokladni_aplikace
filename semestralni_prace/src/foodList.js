import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbarFilterButton} from '@mui/x-data-grid';

export default function FoodList({hoover, rows, deleteItem}) {

    function Toolbar() {
        return (
            <div style={{textAlign: "left", borderBottom: "1px solid #ccc"}}>
                <GridToolbarFilterButton/>
            </div>
        );
    }

    const columns = [

        {
            field: 'name',
            headerName: 'Název položky:',
            width: 300,
            height: 100,
            editable: true,
        },
        {
            field: 'type',
            headerName: 'Druh položky:',
            width: 300,
            height: 100,
            editable: true,
        },
        {
            field: 'priceWithoutDph',
            headerName: 'Cena bez DPH:',
            type: 'number',
            width: 110,
            editable: false,
            valueGetter: (value, row) => {
                return ((row.price_dph * 10 / (100+(row.dph*100)))*10).toFixed(2);
            },
            valueFormatter: (value) => {
                if (value == null) {
                    return '';
                }
                return `${Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                            value.toLocaleString()
                        )}`;

            },

        },
        {
            field: 'dph',
            headerName: 'DPH:',
            type: 'number',
            width: 130,
            editable: true,
            filterable: false,
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
            editable: true,
            valueFormatter: (value) => {
                if (value == null) {
                    return '';
                }
                return `${Intl.NumberFormat('cz-CZ', { style: 'currency', currency: 'CZK' }).format(
                    value.toFixed(2).toLocaleString()
                )}`;
            },

        },
        {
            field: 'add',
            headerName: "Akce",
            renderCell: (cellValues) => {
                return(
                    <div>
                <button onClick={(event) => addToTicket(cellValues.id)} className={"button"} style={{margin: "4%"}}>+</button>
                <button onClick={(event) => handleDelete(cellValues.id)} className={"button"}>x</button>
                    </div>
            )
            },
            filterable: false,
            editable: false,
        },
    ];

    function addToTicket(id) {
        for(let x = 0; x < rows.length; x++) {
            if (rows[x].id == id) {
                hoover(rows[x])
            }
        }
    }

    function handleDelete(id) {
        deleteItem(id)
    }

    return (
        <Box sx={{ height: "700px", width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 15,
                        },
                    },
                }}
                pageSizeOptions={[15]}
                slots={{
                    toolbar: Toolbar,
                }}
            />
        </Box>
    );
}
