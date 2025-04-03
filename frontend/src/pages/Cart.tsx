import { useEffect } from 'react';
import { Typography, Grid, Box, Button } from '@mui/material';
import { CartService } from '../services/cart/cart.service'; // Updated import
import useCartStore from '../services/users/cart'; // Import Zustand store
import { CartItemDto } from '../services/cart/dto/cartItem.dtos'; // Import CartItemDto
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cartItem/CartItem'; // Import CartItem component

function Cart() {
  const { items: cartItems, addItem, removeItem, updateItem, clearCart } = useCartStore(); // Zustand state
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await CartService.fetchCartItems(); // Updated usage
        clearCart();
        data.forEach((item) => addItem(item));
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = (id: number) => {
    CartService.removeCartItem(id); // Remove item from the server
    removeItem(id); // Update Zustand state
  };

  const handleAddToCart = (item: CartItemDto) => {
    addItem(item); // Update Zustand state
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateItem(id, { quantity }); // Update Zustand state
  };

  const handleClearCart = async () => {
    await CartService.clearCart(); // Clear cart on the server
    clearCart();
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Box sx={{ textAlign: 'center', mt: 5, maxWidth: '100%', paddingLeft: 15, paddingRight: 15 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Your Cart
      </Typography>
      <Typography variant="h6" color="text.primary.text" gutterBottom>
        Review your selected items and proceed to checkout.
      </Typography>

      <Grid 
        container 
        spacing={4} 
        sx={{ 
          mt: 6, 
          justifyContent: 'start', 
          display: 'flex', 
          flexWrap: 'wrap' 
        }}
      >
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Grid 
              item 
              key={item.id} 
              sx={{ 
                flexBasis: '350px',
                flexGrow: 1,
                maxWidth: '350px'
              }}
            >
              <CartItem item={item} onRemove={handleRemoveItem} /> {/* Use CartItem */}
            </Grid>
          ))
        ) : (
          <Typography 
            color="text.secondary" 
            sx={{ width: '100%', mt: 4, textAlign: 'center', color: 'white' }}
          >
            Your cart is empty.
          </Typography>
        )}
      </Grid>

      {cartItems.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Total: ${totalPrice.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ mt: 2, ml: 2 }} 
            onClick={() => navigate('/payment')}
          >
            Pay Now
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            sx={{ mt: 2, ml: 2 }} 
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
