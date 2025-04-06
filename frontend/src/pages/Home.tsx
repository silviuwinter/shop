import { useEffect, useState } from 'react';
import { Typography, Grid, Box, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { ProductService } from '../services/products/products';
import { ProductDto } from '../services/products/dto/product.dtos';
import ProductItem from '../components/productItem/ProductItem';

function Home() {
  // state to hold all products fetched from the server
  const [products, setProducts] = useState<ProductDto[]>([]);
  // state for the search input value
  const [searchTerm, setSearchTerm] = useState('');
  // state for the filtered and sorted products to display
  const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);
  // state to track how products should be sorted (by name or price)
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // fetch all products when the component loads
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data); // save all products
        setFilteredProducts(data); // initially show all products
      })
      .catch((error) => console.error('Failed to fetch products:', error)); // log if something goes wrong
  }, []);

  useEffect(() => {
    // filter products based on the search term
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) // check if product name matches search
    );

    // sort products
    if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name)); // sort alphabetically
    } else if (sortBy === 'price') {
      filtered = filtered.sort((a, b) => a.price - b.price); // sort by price (low to high)
    }

    setFilteredProducts(filtered); // update the displayed products
  }, [searchTerm, products, sortBy]); // run this whenever searchTerm, products, or sortBy changes

  return (
    <Box sx={{ textAlign: 'center', mt: 5, maxWidth: '100%', paddingLeft: 15, paddingRight: 15 }}>
      {/* title of the page */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to iStore
      </Typography>
      {/* subtitle */}
      <Typography variant="h6" color="text.primary.text" gutterBottom>
        Browse all products and find the best deals!
      </Typography>

      {/* search and sort section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 3, gap: 2 }}>
        {/* search input */}
        <TextField
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#D3D3D3', borderRadius: 5,
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // no border color when focused
              },
            }, 
          }}
          value={searchTerm} // bind input value to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // update searchTerm when user types
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'gray' }} /> {/* search icon inside the input */}
              </InputAdornment>
            ),
          }}
        />
        {/* dropdown to select sorting option */}
        <FormControl 
          variant="outlined" 
          sx={{ 
            minWidth: 150, 
            '& .MuiOutlinedInput-root': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D3D3D3', // light gray border
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
          <InputLabel sx={{ color: 'white' }}>Sort By</InputLabel> {/* label for dropdown */}
          <Select
            value={sortBy} // bind dropdown value to sortBy state
            onChange={(e) => setSortBy(e.target.value)} // update sortBy when user selects an option
            label="Sort By"
            sx={{ color: 'white', '& .MuiSvgIcon-root': { color: 'white' } }} // white text and icon
          >
            <MenuItem value="name">Name</MenuItem> {/* sort by name */}
            <MenuItem value="price">Price</MenuItem> {/* sort by price */}
          </Select>
        </FormControl>
      </Box>

      {/* grid to display products */}
      <Grid 
        container 
        spacing={4} 
        sx={{ 
          mt: 6, 
          justifyContent: 'flex-start', // align items to the left
          display: 'flex', 
          flexWrap: 'wrap' 
        }}
      >
        {filteredProducts.length > 0 ? (
          // map through filtered products and display each one
          filteredProducts.map((product) => (
            <Grid 
              item 
              key={product.id} // unique key for each product
              sx={{ 
                flexBasis: '350px', // each product takes up 350px space
                flexGrow: 1,
                maxWidth: '350px'
              }}
            >
              <ProductItem product={product} /> {/* render product item */}
            </Grid>
          ))
        ) : (
          // show this message if no products match the search
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
