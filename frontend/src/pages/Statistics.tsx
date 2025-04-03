import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { OrdersService } from '../services/orders/orders.service';
import { StatProductDto } from '../services/orders/dto/orders.dto';

const productColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Product Name', width: 150 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 110 },
];

export default function Statistics() {
    const [mostBoughtProducts, setMostBoughtProducts] = useState<StatProductDto[]>([]);
    const [leastBoughtProducts, setLeastBoughtProducts] = useState<StatProductDto[]>([]);
    const [timeRelatedProducts, setTimeRelatedProducts] = useState<StatProductDto[]>([]);

    useEffect(() => {
        async function fetchStatistics() {
            const stats = await OrdersService.getStatistics();
            setMostBoughtProducts(stats.mostBoughtProducts);
            setLeastBoughtProducts(stats.leastBoughtProducts);
            setTimeRelatedProducts(stats.timeRelatedProducts); // New data fetching
        }
        fetchStatistics();
    }, []);

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 5, p: 3 }}>
            {/* Most Bought Products */}
            <Box sx={{ boxShadow: 3, borderRadius: 2, p: 3, mb: 5, backgroundColor: 'white' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'black' }}>
                    Top 5 Best-Selling Products
                </Typography>
                <DataGrid
                    rows={mostBoughtProducts.map((product, index) => ({
                        id: index + 1,
                        name: product.name,
                        quantity: product.totalSold,
                    }))}
                    columns={productColumns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-root': { backgroundColor: 'white' },
                        '& .MuiDataGrid-cell': { color: 'black' },
                        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5', color: 'black' },
                    }}
                />
            </Box>

            {/* Least Bought Products */}
            <Box sx={{ boxShadow: 3, borderRadius: 2, p: 3, backgroundColor: 'white' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'black' }}>
                    Top 5 Least-Selling Products
                </Typography>
                <DataGrid
                    rows={leastBoughtProducts.map((product, index) => ({
                        id: index + 1,
                        name: product.name,
                        quantity: product.totalSold,
                    }))}
                    columns={productColumns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-root': { backgroundColor: 'white' },
                        '& .MuiDataGrid-cell': { color: 'black' },
                        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5', color: 'black' },
                    }}
                />
            </Box>

            {/* Time-Related Product Statistics */}
            <Box sx={{ boxShadow: 3, borderRadius: 2, p: 3, mt: 5, backgroundColor: 'white' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'black' }}>
                    Latest  Products Sold this Week
                </Typography>
                <DataGrid
                    rows={timeRelatedProducts.map((product, index) => ({
                        id: index + 1,
                        name: product.name,
                        quantity: product.totalSold,
                    }))}
                    columns={productColumns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-root': { backgroundColor: 'white' },
                        '& .MuiDataGrid-cell': { color: 'black' },
                        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5', color: 'black' },
                    }}
                />
            </Box>
        </Box>
    );
}