import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductDto } from '../../services/products/dto/product.dtos';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FilesService } from '../../services/files/files.service';
import useCartStore from '../../services/users/cart'; // Import Zustand store
import { CartService } from '../../services/cart/cart.service'; // Updated import
import { CartItemDto } from '../../services/cart/dto/cartItem.dtos'; // Import CartItemDto

interface ProductItemProps {
  product: ProductDto;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addItem } = useCartStore(); // Zustand addItem function
  async function handleAddToCart() {
    try {
      await CartService.addToCart(product.id, 1); // Updated usage
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
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <Card
        sx={{
          maxWidth: 300,
          width: '100%',
          boxShadow: 8,
          borderRadius: 4,
          overflow: 'hidden',
          transition: '0.3s',
          background: '#ffffff',
          color: '#000000',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={FilesService.getFileUrl(product?.imageUrl) || '/images/image-standard.png'}
          alt={product.name}
          sx={{ objectFit: 'cover', width: '100%' }}
        />
        <CardContent sx={{ p: 3, textAlign: 'left' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            <strong>Processor:</strong> {product.processor}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            <strong>RAM:</strong> {product.ram}GB
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            <strong>Storage:</strong> {product.storage}GB
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            <strong>Webcam:</strong> {product.webcam ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            <strong>Microphone:</strong> {product.microphone ? 'Yes' : 'No'}
          </Typography>

          {/* Centered price & buttons */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ${product.price.toFixed(2)}
            </Typography>
            
            {/* Buttons aligned in a row */}
            <Box display="flex" justifyContent="center" gap={1} mt={2}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/products/${product.id}`}
                sx={{
                  px: 3,
                  py: 1,
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                View Details
              </Button>
              
              {/* Green Add to Cart Button */}
              <IconButton 
                onClick={handleAddToCart} 
                sx={{ 
                  bgcolor: 'green', 
                  color: 'white', 
                  borderRadius: 2, 
                  '&:hover': { bgcolor: 'darkgreen' }
                }}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductItem;