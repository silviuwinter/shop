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
import useCartStore from '../services/users/cart';
import { CartService } from '../services/cart/cart.service';
import { CartItemDto } from '../services/cart/dto/cartItem.dtos';

function ProductOverview() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const { addItem } = useCartStore(); // Zustand addItem function

  const nav = useNavigate();

  useEffect(() => {
    let isMounted = true; 

    if (id) {
      setLoading(true);
      setError(null);

      ProductService.getProductById(id)
        .then((data) => {
          if (isMounted) {
            setProduct(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch product:', error);
          if (isMounted) {
            setError('Failed to load product.');
            setLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" color="error">{error || 'Product not found'}</Typography>
      </Container>
    );
  }

  async function handleDelete() {
    try {
      if (!product) {
        return;
      }
      await ProductService.deleteProduct(product.id);
      nav('/');
    } catch (error) {
      console.error('Failed to delete product:', error);
      setError('Failed to delete product. Please try again.');
    }
  }

  async function handleAddToCart() {
    try {
      if (!product) {
        return;
      }
      await CartService.addToCart(Number(id), 1); // Updated usage
      const cartItem: CartItemDto = {
        id: product.id, // Use product ID as cart item ID
        productId: product.id,
        quantity: 1,
        product: product,
      };

      addItem(cartItem); // Update Zustand state
      alert('Product added to cart!');
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  }

  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 6, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
        <IconButton
          onClick={handleMenuOpen}
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
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { handleMenuClose(); nav(`/products/edit/${product.id}`); }}>
            Edit
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); handleDelete(); }}>
            Delete
          </MenuItem>
        </Menu>
        <CardMedia
          component="img"
          height="300"
          image={FilesService.getFileUrl(product?.imageUrl) || '/images/image-standard.png'}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
          <Typography variant="body1" color="text.secondary" mt={2}>
            <strong>Processor:</strong> {product.processor}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>RAM:</strong> {product.ram}GB
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Storage:</strong> {product.storage}GB
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Webcam:</strong> {product.webcam ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
             <strong>Microphone:</strong> {product.microphone ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="h5" sx={{ mt: 3, fontWeight: 'bold', color: 'primary.main' }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Box display="flex" justifyContent="center" mt={3}>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }} 
              onClick={handleAddToCart}
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