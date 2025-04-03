import  { useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Box,
    Alert,
    Avatar,
} from '@mui/material';
import { OrdersService } from '../services/orders/orders.service';
import { useUserStore } from '../../store/userStore';
import { UserDto } from '../../interfaces/userInterfaces';

const Payment = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const customerDetails: UserDto = useUserStore((state) => state.auth?.user)!; // Fetch user from Zustand store
    const handleBuyNow = () => {
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        OrdersService.createOrder()
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
        }, 2000); // Simulate a 2-second payment process
    };

    return (
        <Container sx={{ textAlign: 'center', mt: 5 }}>
            <Card
                sx={{
                    maxWidth: 600,
                    margin: 'auto',
                    boxShadow: 6,
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: '#D3D3D3',
                }}
            >
                <CardContent>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                        Pay Now
                    </Typography>
                    {!paymentSuccess ? (
                        <>
                            <Box sx={{ textAlign: 'left', mb: 3, display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">User Information:</Typography>
                                    <Typography>Name: {customerDetails.name}</Typography>
                                    <Typography>Address: {customerDetails.address}</Typography>
                                    <Typography>Email: {customerDetails.email}</Typography>
                                </Box>
                                <Box sx={{ ml: 2, display: 'flex', justifyContent: 'center' }}>
                                    <Avatar
                                        src={"/images/regular_guy.jpg"}
                                        alt="Profile"
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <Typography>Select Payment Method</Typography>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled={isProcessing}
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        fontSize: '16px',
                                        marginTop: '10px',
                                        color: 'black',
                                    }}
                                >
                                    <option value="" style={{ color: 'black' }}>-- Select Payment Method --</option>
                                    <option value="creditCard" style={{ color: 'black' }}>Credit Card</option>
                                    <option value="paypal" style={{ color: 'black' }}>PayPal</option>
                                    <option value="bankTransfer" style={{ color: 'black' }}>Bank Transfer</option>
                                </select>
                            </Box>
                            <Button
                                onClick={handleBuyNow}
                                variant="contained"
                                color="primary"
                                disabled={isProcessing}
                                fullWidth
                            >
                                {isProcessing ? 'Processing...' : 'Buy Now'}
                            </Button>
                        </>
                    ) : (
                        <Alert severity="success" sx={{ mt: 3 }}>
                            Payment Successful! Thank you for your purchase.
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Payment;
