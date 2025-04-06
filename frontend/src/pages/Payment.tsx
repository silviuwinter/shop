import { useState } from 'react';
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
    const [isProcessing, setIsProcessing] = useState(false); // tracks if payment is being processed
    const [paymentSuccess, setPaymentSuccess] = useState(false); // tracks if payment was successful
    const [paymentMethod, setPaymentMethod] = useState(''); // stores selected payment method

    const customerDetails: UserDto = useUserStore((state) => state.auth?.user)!; // gets user info from store

    const handleBuyNow = () => {
        if (!paymentMethod) { // checks if payment method is selected
            alert('Please select a payment method.'); // show alert if no method is selected
            return;
        }

        OrdersService.createOrder(); // pretend to create an order (not implemented here)
        setIsProcessing(true); // show "processing" state
        setTimeout(() => { // fake a delay for payment processing
            setIsProcessing(false); // stop "processing" state
            setPaymentSuccess(true); // mark payment as successful
        }, 2000); // 2-second delay
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
                    {!paymentSuccess ? ( // if payment not done, show form
                        <>
                            <Box
                                sx={{
                                    textAlign: 'left',
                                    mb: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: '#f9f9f9',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ mb: 1, color: '#555' }}>
                                        User Information:
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: '100px auto',
                                            rowGap: 0.5,
                                            columnGap: 1,
                                        }}
                                    >
                                        <Typography sx={{ color: '#666', fontWeight: 'bold' }}>Name:</Typography>
                                        <Typography sx={{ color: '#666' }}>{customerDetails.name}</Typography> {/* user's name */}
                                        <Typography sx={{ color: '#666', fontWeight: 'bold' }}>Address:</Typography>
                                        <Typography sx={{ color: '#666' }}>{customerDetails.address}</Typography> {/* user's address */}
                                        <Typography sx={{ color: '#666', fontWeight: 'bold' }}>Email:</Typography>
                                        <Typography sx={{ color: '#666' }}>{customerDetails.email}</Typography> {/* user's email */}
                                    </Box>
                                </Box>
                                <Avatar
                                    src={"/images/regular_guy.jpg"} // profile pic placeholder
                                    alt="Profile"
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        border: '2px solid #ccc',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <Typography>Select Payment Method</Typography>
                                <select
                                    value={paymentMethod} // current selected method
                                    onChange={(e) => setPaymentMethod(e.target.value)} // update method on change
                                    disabled={isProcessing} // disable dropdown if processing
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
                                onClick={handleBuyNow} // triggers payment process
                                variant="contained"
                                color="primary"
                                disabled={isProcessing} // disable button if processing
                                fullWidth
                            >
                                {isProcessing ? 'Processing...' : 'Buy Now'} {/* show "processing" or "buy now" */}
                            </Button>
                        </>
                    ) : (
                        <Alert severity="success" sx={{ mt: 3 }}>
                            Payment Successful! Thank you for your purchase. {/* success message */}
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Payment;
