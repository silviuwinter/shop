import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductDto } from '../../services/products/dto/product.dtos';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FilesService } from '../../services/files/files.service';
import useCartStore from '../../services/cart/cart';
import { CartService } from '../../services/cart/cart.service';
import { CartItemDto } from '../../services/cart/dto/cartItem.dtos';
import { useUserStore } from '../../../store/userStore'; // navbar import

interface ProductItemProps {
  product: ProductDto; // product data passed as a prop
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addItem } = useCartStore(); // function to add items to cart
  const navigate = useNavigate(); // for navigating to other pages
  const isLoggedIn = useUserStore((state) => state.auth?.token); // check if user is logged in

  async function handleAddToCart() {
    // adds product to cart or redirects to login if not logged in
    if (!isLoggedIn) {
      alert('Please login to add items to cart'); // show alert if not logged in
      navigate('/login'); // go to login page
      return;
    }
    
    try {
      await CartService.addToCart(product.id, 1); // call api to add product to cart
      const cartItem: CartItemDto = {
        id: product.id, // cart item id
        productId: product.id, // product id
        quantity: 1, // default quantity
        product: product, // product details
      };

      addItem(cartItem); // update cart in local state
      alert('Product added to cart!'); // success message
    } catch (error) {
      console.error('Failed to add product to cart:', error); // log error if api fails
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      {/* card for product */}
      <Card
        sx={{
          maxWidth: 300, // max width of card
          width: '100%',
          boxShadow: 8, // shadow effect
          borderRadius: 4, // rounded corners
          overflow: 'hidden', // hide overflow
          transition: '0.3s', // smooth transition
          background: '#ffffff', // white background
          color: '#000000', // black text
          display: 'flex',
          flexDirection: 'column', // stack content vertically
        }}
      >
        {/* product image */}
        <CardMedia
          component="img"
          height="180" // image height
          image={FilesService.getFileUrl(product?.imageUrl) || '/images/image-standard.png'} // show product image or default
          alt={product.name} // alt text for image
          sx={{ objectFit: 'cover', width: '100%' }} // make image cover the area
        />
        <CardContent sx={{ p: 3, textAlign: 'left' }}>
          {/* product name */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          {/* product details */}
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
            <strong>Webcam:</strong> {product.webcam ? 'Yes' : 'No'} {/* show yes/no */}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            <strong>Microphone:</strong> {product.microphone ? 'Yes' : 'No'} {/* show yes/no */}
          </Typography>

          {/* price and buttons */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ${product.price.toFixed(2)} {/* show price */}
            </Typography>
            
            {/* buttons */}
            <Box display="flex" justifyContent="center" gap={1} mt={2}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/products/${product.id}`} // link to product details page
                sx={{
                  px: 3,
                  py: 1,
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none', // keep text as is
                }}
              >
                View Details
              </Button>
              
              {/* add to cart button */}
              <IconButton 
                onClick={handleAddToCart} // call add to cart function
                sx={{ 
                  bgcolor: 'green', // green background
                  color: 'white', // white icon
                  borderRadius: 2, // rounded button
                  '&:hover': { bgcolor: 'darkgreen' } // darker green on hover
                }}
              >
                <AddShoppingCartIcon /> {/* cart icon */}
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductItem;