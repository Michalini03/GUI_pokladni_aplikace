import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [

    {
        field: 'name',
        headerName: 'Název položky:',
        width: 300,
        height: 100,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Cena:',
        type: "number",
        width: 150,
        editable: true,
        valueFormatter: (value) => {
            if (value == null) {
                return '';
            }
            return `${value.toLocaleString()} CZK`;
        },

    },
    {
        field: 'age',
        headerName: 'DPH:',
        type: 'number',
        width: 110,
        editable: true,
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
        field: 'priceWithDph',
        headerName: 'Cena s DPH:',
        type: 'number',
        width: 110,
        editable: true,
        valueGetter: (value, row) => {
            return (row.price * 10 + (row.price*10)*(row.age))/10;
        },
        valueFormatter: (value) => {
            if (value == null) {
                return '';
            }
            return `${value.toLocaleString()} CZK`;
        },

    },

];

const rows = [
    { id: 1, name: 'Snow', price: 169.90, age: 0.21 },
    { id: 2, name: 'Lannister', price: 200.50, age: 0.21 },
    { id: 3, name: 'Lannister', price: 190.90, age: 0.00 },
    { id: 4, name: 'Stark', price: 30.90, age: 0.00 },
    { id: 5, name: 'Targaryen', price: 45.90, age: 0.15 },
    { id: 6, name: 'Melisandre', price: 33.90, age: 0.21 },
    { id: 7, name: 'Clifford', price: 5.90, age: 0.15 },
    { id: 8, name: 'Frances', price: 119.90, age: 0.10 },
    { id: 9, name: 'Roxie', price: 26.90, age: 0.15 },
];

export default function FoodList() {
    return (
        <Box sx={{ height: 770, width: '100%' }}>
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
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}
