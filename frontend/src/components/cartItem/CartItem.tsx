import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { useState } from 'react';
import { CartItemDto } from '../../services/cart/dto/cartItem.dtos';
import { FilesService } from '../../services/files/files.service';
import { CartService } from '../../services/cart/cart.service';
import useCartStore from '../../services/cart/cart';

interface CartItemProps {
  item: CartItemDto; // the item data passed to this component
  onRemove: (id: number) => void; // function to remove the item
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity); // keeps track of how many of this item
  const { modifyQuantity } = useCartStore(); // zustand function to update quantity in the store

  const handleIncrease = async () => {
    // increases the quantity of the item
    const newQuantity = quantity + 1; // add 1 to the current quantity
    await CartService.updateCartItem(Number(item.id), newQuantity); // updates the backend
    modifyQuantity(item.id, newQuantity); // updates the store
    setQuantity(newQuantity); // updates the local state
  };

  const handleDecrease = async () => {
    // decreases the quantity of the item
    if (quantity > 1) { // only decrease if quantity is more than 1
      const newQuantity = quantity - 1; // subtract 1 from the current quantity
      await CartService.updateCartItem(Number(item.id), newQuantity); // updates the backend
      modifyQuantity(item.id, newQuantity); // updates the store
      setQuantity(newQuantity); // updates the local state
    }
  };

  return (
    <Card 
      sx={{ 
        marginBottom: 2, 
        boxShadow: 3, 
        transition: 'transform 0.2s', 
        '&:hover': { transform: 'scale(1.02)' }, // makes the card pop out a bit on hover
        maxWidth: '900px', 
        margin: '0 auto', // centers the card
        padding: 2, 
        borderRadius: 5, 
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}> {/* layout for the card */}
        <Box 
          component="img" 
          src={FilesService.getFileUrl(item?.product.imageUrl) || '/images/image-standard.png'} 
          alt={item.product.name} 
          sx={{ 
            width: 150, 
            height: 150, 
            borderRadius: 2, 
            marginRight: 3 // space between image and text
          }} 
        />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* text section */}
          <Typography variant="h5" fontWeight="bold" sx={{ textAlign: 'left' }}>{item.product.name}</Typography> {/* item name */}
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'left' }}>Price per item: ${item.product.price.toFixed(2)}</Typography> {/* price */}
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'left' }}>Quantity: {quantity}</Typography> {/* current quantity */}
          <Typography variant="body1" fontWeight="bold" sx={{ textAlign: 'left' }}>Total: ${(item.product.price * quantity).toFixed(2)}</Typography> {/* total price */}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> {/* buttons section */}
          <Box sx={{ display: 'flex', gap: 1, marginBottom: 1 }}> {/* increase/decrease buttons */}
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleDecrease} 
              disabled={quantity <= 1} // disable if quantity is 1
            >
              -
            </Button>
            <Button 
              variant="outlined" 
              color="success" 
              onClick={handleIncrease}
            >
              +
            </Button>
          </Box>
          <Typography 
            variant="body2" 
            color="error" 
            sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: 1, cursor: 'pointer', textTransform: 'uppercase' }} // remove button styling
            onClick={() => onRemove(item.id)} // calls the remove function
          >
            REMOVE ITEM
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;