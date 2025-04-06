import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { OrdersService } from '../services/orders/orders.service';
import { StatProductDto } from '../services/orders/dto/orders.dto';

const productColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 }, // column for product id
    { field: 'name', headerName: 'Product Name', width: 150 }, // column for product name
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 110 }, // column for quantity sold
];

export default function Statistics() {
    const [mostBoughtProducts, setMostBoughtProducts] = useState<StatProductDto[]>([]); // holds top 5 best-selling products
    const [leastBoughtProducts, setLeastBoughtProducts] = useState<StatProductDto[]>([]); // holds top 5 least-selling products

    useEffect(() => {
        async function fetchStatistics() {
            const stats = await OrdersService.getStatistics(); // get stats from the service
            setMostBoughtProducts(stats.mostBoughtProducts); // update best-selling products
            setLeastBoughtProducts(stats.leastBoughtProducts); // update least-selling products
        }
        fetchStatistics(); // call the function when the component loads
    }, []);

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 5, p: 3 }}> {/* container for the whole page */}
            {/* section for most bought products */}
            <Box sx={{ boxShadow: 3, borderRadius: 2, p: 3, mb: 5, backgroundColor: 'white' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'black' }}>
                    Top 5 Best-Selling Products {/* title for the section */}
                </Typography>
                <DataGrid
                    rows={mostBoughtProducts.map((product, index) => ({
                        id: index + 1, // give each row a unique id
                        name: product.name, // product name
                        quantity: product.totalSold, // total sold quantity
                    }))}
                    columns={productColumns} // use the defined columns
                    pageSizeOptions={[5]} // show 5 rows per page
                    disableRowSelectionOnClick // disable row selection
                    sx={{
                        '& .MuiDataGrid-root': { backgroundColor: 'white' }, // table background
                        '& .MuiDataGrid-cell': { color: 'black' }, // cell text color
                        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5', color: 'black' }, // header style
                    }}
                />
            </Box>

            {/* section for least bought products */}
            <Box sx={{ boxShadow: 3, borderRadius: 2, p: 3, backgroundColor: 'white' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'black' }}>
                    Top 5 Least-Selling Products {/* title for the section */}
                </Typography>
                <DataGrid
                    rows={leastBoughtProducts.map((product, index) => ({
                        id: index + 1, // give each row a unique id
                        name: product.name, // product name
                        quantity: product.totalSold, // total sold quantity
                    }))}
                    columns={productColumns} // use the defined columns
                    pageSizeOptions={[5]} // show 5 rows per page
                    disableRowSelectionOnClick // disable row selection
                    sx={{
                        '& .MuiDataGrid-root': { backgroundColor: 'white' }, // table background
                        '& .MuiDataGrid-cell': { color: 'black' }, // cell text color
                        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5', color: 'black' }, // header style
                    }}
                />
            </Box>
        </Box>
    );
}