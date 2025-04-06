import { useState } from 'react';
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../services/products/products';
import { ProductDto } from '../services/products/dto/product.dtos';
import { FilesService } from '../services/files/files.service';

function CreateProduct() {
  const initialProduct: Omit<ProductDto, 'id'> = {
    name: '',
    processor: '',
    ram: 0,
    storage: 0,
    webcam: false,
    microphone: false,
    price: 0,
    imageUrl: ''
  };

  const [product, setProduct] = useState(initialProduct);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // updates the product state when the user types in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : type === 'number' || name === 'price' ? parseFloat(value) || 0 : value
    });
  };

  // handles image file selection and sets a preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result?.toString() || '');
      reader.readAsDataURL(file);
    }
  };

  // sets a default image if no image is uploaded
  const useDefaultImage = () => {
    setImageFile(undefined);
    setPreviewUrl('/images/image-standard.png');
  };

  // handles form submission to create a new product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setIsUploading(true);
      const imageUrl = imageFile ? await FilesService.uploadFile(imageFile) : product.imageUrl;
      setIsUploading(false);

      const createdProduct = await ProductService.createProduct({ ...product, imageUrl });
      navigate(`/products/${createdProduct.id}`);
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
      {/* page title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>Create Product</Typography>
      {/* error message */}
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <form onSubmit={handleSubmit}>
        {/* create inputs for each product field */}
        {Object.entries(initialProduct).map(([key, value]) => (
          key === 'imageUrl' ? null : typeof value === 'boolean' ? (
            // checkbox for boolean fields
            <FormControlLabel
              key={key}
              control={<Checkbox name={key} onChange={handleChange} />}
              label={<Typography sx={{ color: 'black' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>}
            />
          ) : (
            // text or number input for other fields
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              fullWidth
              required
              type={key === 'price' || typeof value === 'number' ? 'number' : 'text'}
              value={product[key as keyof typeof product]}
              onChange={handleChange}
              sx={{ mb: 2 }}
              inputProps={key === 'price' ? { step: '0.01' } : undefined}
            />
          )
        ))}
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1">Product Image</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* button default image */}
            <Button variant="outlined" color="secondary" onClick={useDefaultImage} disabled={isUploading}>Use Default Image</Button>
            {/* button custom image */}
            <Button variant="outlined" color="secondary" component="label" disabled={isUploading}>
              Add Your Own Picture
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>
          {/* loading spinner */}
          {isUploading && <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
          {/* image preview */}
          {previewUrl && !isUploading && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Image Preview:</Typography>
              <img src={previewUrl} alt="Product preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
            </Box>
          )}
        </Box>
        {/* submit button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>Create Product</Button>
      </form>
    </Box>
  );
}

export default CreateProduct;