import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { useState } from 'react';
import { CartItemDto } from '../../services/cart/dto/cartItem.dtos';
import { FilesService } from '../../services/files/files.service';
import { CartService } from '../../services/cart/cart.service';
import useCartStore from '../../services/users/cart';

interface CartItemProps {
  item: CartItemDto;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { modifyQuantity } = useCartStore(); // Zustand addItem function

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    await CartService.updateCartItem(Number(item.id), newQuantity);
    modifyQuantity(item.id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      await CartService.updateCartItem(Number(item.id), newQuantity);
      modifyQuantity(item.id,newQuantity);
      setQuantity(newQuantity);

    }
  };

  return (
    <Card 
      sx={{ 
        marginBottom: 2, 
        boxShadow: 3, 
        transition: 'transform 0.2s', 
        '&:hover': { transform: 'scale(1.02)' } 
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Box 
          component="img" 
          src={FilesService.getFileUrl(item?.product.imageUrl) || '/images/image-standard.png'} 
          alt={item.product.name} 
          sx={{ 
            width: 64, 
            height: 64, 
            borderRadius: 1, 
            marginRight: 2 
          }} 
        />
        <Box>
          <Typography variant="h6" gutterBottom>{item.product.name}</Typography>
          <Typography variant="body2" color="textSecondary">Quantity: {quantity}</Typography>
          <Typography variant="body2" color="textSecondary">Price: ${(item.product.price * quantity).toFixed(2)}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="primary" onClick={handleDecrease} disabled={quantity <= 1}>
          -
        </Button>
        <Button variant="outlined" color="primary" onClick={handleIncrease}>
          +
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => onRemove(item.id)}
          sx={{ marginLeft: 'auto' }}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;