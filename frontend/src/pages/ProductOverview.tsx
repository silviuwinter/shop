import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ProductService } from '../services/products/products';
import { ProductDto } from '../services/products/dto/product.dtos';
import { FilesService } from '../services/files/files.service';
import useCartStore from '../services/cart/cart';
import { CartService } from '../services/cart/cart.service';
import { CartItemDto } from '../services/cart/dto/cartItem.dtos';
import { useUserStore } from '../../store/userStore';

function ProductOverview() {
  const { id } = useParams(); // get product id from url
  const [product, setProduct] = useState<ProductDto | null>(null); // store product details
  const [loading, setLoading] = useState(true); // show loading spinner
  const [error, setError] = useState<string | null>(null); // store error messages
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null); // for the dropdown menu
  const { addItem } = useCartStore(); // zustand function to add items to cart
  const isLoggedIn = useUserStore((state) => state.auth?.token); // check if user is logged in

  const nav = useNavigate(); // for navigation

  useEffect(() => {
    let isMounted = true; // prevent state updates if component unmounts

    if (id) {
      setLoading(true); // start loading
      setError(null); // clear errors

      ProductService.getProductById(id) // fetch product details
        .then((data) => {
          if (isMounted) {
            setProduct(data); // save product data
            setLoading(false); // stop loading
          }
        })
        .catch((error) => {
          console.error('Failed to fetch product:', error); // log error
          if (isMounted) {
            setError('Failed to load product.'); // show error message
            setLoading(false); // stop loading
          }
        });
    }

    return () => {
      isMounted = false; // cleanup when component unmounts
    };
  }, [id]); // runs when id changes

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget); // open dropdown menu
  };

  const handleMenuClose = () => {
    setMenuAnchor(null); // close dropdown menu
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> {/* show spinner while loading */}
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" color="error">{error || 'Product not found'}</Typography> {/* show error or not found */}
      </Container>
    );
  }

  async function handleDelete() {
    try {
      if (!product) {
        return; // no product, nothing to delete
      }
      await ProductService.deleteProduct(product.id); // delete product
      nav('/'); // go back to home
    } catch (error) {
      console.error('Failed to delete product:', error); // log error
      setError('Failed to delete product. Please try again.'); // show error message
    }
  }

  async function handleAddToCart() {
    if (!isLoggedIn) {
      alert('Please login to add items to cart'); // ask user to log in
      nav('/login'); // redirect to login page
      return;
    }
    
    try {
      if (!product) {
        return; // no product, nothing to add
      }
      await CartService.addToCart(Number(id), 1); // add product to cart
      const cartItem: CartItemDto = {
        id: product.id, // use product id for cart item
        productId: product.id,
        quantity: 1, // default quantity
        product: product, // attach product details
      };

      addItem(cartItem); // update cart state
      alert('Product added to cart!'); // confirm to user
    } catch (error) {
      console.error('Failed to add product to cart:', error); // log error
    }
  }

  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 6, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
        <IconButton
          onClick={handleMenuOpen} // open menu
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <MoreVertIcon /> {/* menu icon */}
        </IconButton>
        <Menu
          anchorEl={menuAnchor} // menu position
          open={Boolean(menuAnchor)} // show menu if anchor exists
          onClose={handleMenuClose} // close menu
        >
          <MenuItem onClick={() => { handleMenuClose(); nav(`/products/edit/${product.id}`); }}> {/* go to edit page */}
            Edit
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); handleDelete(); }}> {/* delete product */}
            Delete
          </MenuItem>
        </Menu>
        <CardMedia
          component="img"
          height="300"
          image={FilesService.getFileUrl(product?.imageUrl) || '/images/image-standard.png'} // show product image or default
          alt={product.name} // image alt text
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h4" fontWeight="bold">{product.name}</Typography> {/* product name */}
          <Typography variant="body1" color="text.secondary" mt={2}>
            <strong>Processor:</strong> {product.processor} {/* product processor */}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>RAM:</strong> {product.ram}GB {/* product ram */}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Storage:</strong> {product.storage}GB {/* product storage */}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Webcam:</strong> {product.webcam ? 'Yes' : 'No'} {/* webcam availability */}
          </Typography>
          <Typography variant="body1" color="text.secondary">
             <strong>Microphone:</strong> {product.microphone ? 'Yes' : 'No'} {/* microphone availability */}
          </Typography>
          <Typography variant="h5" sx={{ mt: 3, fontWeight: 'bold', color: 'primary.main' }}>
            ${product.price.toFixed(2)} {/* product price */}
          </Typography>

          <Box display="flex" justifyContent="center" mt={3}>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }} 
              onClick={handleAddToCart} // add to cart
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductOverview;