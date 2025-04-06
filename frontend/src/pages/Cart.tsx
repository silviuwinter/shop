import { useEffect } from 'react';
import { Typography, Grid, Box, Button } from '@mui/material';
import { CartService } from '../services/cart/cart.service';
import useCartStore from '../services/cart/cart';
import { CartItemDto } from '../services/cart/dto/cartItem.dtos';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cartItem/CartItem';

function Cart() {
  const { items: cartItems, addItem, removeItem, updateItem, clearCart } = useCartStore(); 
  const navigate = useNavigate();

  useEffect(() => {
    // fetch cart items from the server on page load
    const fetchCart = async () => {
      try {
        const data = await CartService.fetchCartItems();
        clearCart();
        data.forEach((item) => addItem(item));
      } catch (error) {
        console.error('couldn’t fetch cart items:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = (id: number) => {
    CartService.removeCartItem(id); // remove item from server
    removeItem(id); // update local state
  };

  const handleClearCart = async () => {
    await CartService.clearCart(); // clear server cart
    clearCart(); // clear local state
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0); 
  const formattedTotalPrice = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <Box sx={{ textAlign: 'center', mt: 5, maxWidth: '100%', paddingLeft: 15, paddingRight: 15 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Your Cart
      </Typography>
      <Typography variant="h6" color="text.primary.text" gutterBottom>
        Review your selected items and proceed to checkout.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 6, justifyContent: 'center', display: 'block' }}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <>
              <Box 
                key={item.id} 
                sx={{ marginBottom: '20px', maxWidth: '900px', margin: '0 auto' }}
              >
                <CartItem item={item} onRemove={handleRemoveItem} />
              </Box>
              {index < cartItems.length - 1 && <br />}
            </>
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
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Total: {formattedTotalPrice}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2, mr: 2, backgroundColor: 'red', color: 'white' }} 
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }} 
            onClick={() => navigate('/payment')}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
