import { useEffect, useState } from 'react';
import { Typography, Grid, Box, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { ProductService } from '../services/products/products';
import { ProductDto } from '../services/products/dto/product.dtos';
import ProductItem from '../components/productItem/ProductItem';

function Home() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);
  const [sortBy, setSortBy] = useState('name'); // New state for sorting

  useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Failed to fetch products:', error));
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, products, sortBy]); // Include sortBy in dependencies

  return (
    <Box sx={{ textAlign: 'center', mt: 5, maxWidth: '100%', paddingLeft: 15, paddingRight: 15 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to iStore
      </Typography>
      <Typography variant="h6" color="text.primary.text" gutterBottom>
        Browse all products and find the best deals!
      </Typography>

      {/* Search and Sort */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 3, gap: 2 }}>
        <TextField
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#D3D3D3', borderRadius: 5,
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
            }, 
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'gray' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl 
          variant="outlined" 
          sx={{ 
            minWidth: 150, 
            '& .MuiOutlinedInput-root': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D3D3D3',
                borderRadius: 5,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D3D3D3',
                borderRadius: 5,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D3D3D3',
                borderRadius: 5,
              },
            },
          }}
        >
          <InputLabel sx={{ color: 'white' }}>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
            sx={{ color: 'white', '& .MuiSvgIcon-root': { color: 'white' } }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid 
        container 
        spacing={4} 
        sx={{ 
          mt: 6, 
          justifyContent: 'space-between', 
          display: 'flex', 
          flexWrap: 'wrap' 
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid 
              item 
              key={product.id} 
              sx={{ 
                flexBasis: '350px',
                flexGrow: 1,
                maxWidth: '350px'
              }}
            >
              <ProductItem product={product} />
            </Grid>
          ))
        ) : (
          <Typography 
            color="text.secondary" 
            sx={{ width: '100%', mt: 4, textAlign: 'center', color: 'white' }}
          >
            No products available.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default Home;
