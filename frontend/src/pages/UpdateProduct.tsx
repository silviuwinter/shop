import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductService } from '../services/products/products';
import { ProductDto } from '../services/products/dto/product.dtos';
import { FilesService } from '../services/files/files.service';

function UpdateProduct() {
  // initial empty product template
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

  // state for product details
  const [product, setProduct] = useState(initialProduct);
  const [error, setError] = useState(''); // error message if something goes wrong
  const [imageFile, setImageFile] = useState<File>(); // stores the uploaded image file
  const [previewUrl, setPreviewUrl] = useState(''); // preview of the image
  const [isUploading, setIsUploading] = useState(false); // shows loading spinner during upload
  const navigate = useNavigate(); // for redirecting after update
  const { id: productId } = useParams(); // get product id from url

  useEffect(() => {
    // fetch product details when component loads
    const fetchProduct = async () => {
      try {
        if (productId) {
          const existingProduct = await ProductService.getProductById(productId); // get product by id
          setProduct(existingProduct); // fill form with product data
          setPreviewUrl(existingProduct.imageUrl || ''); // set image preview
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again.'); // show error if fetch fails
      }
    };
    fetchProduct();
  }, [productId]); // runs when productId changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // updates form fields when user types or toggles checkboxes
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : type === 'number' || name === 'price' ? parseFloat(value) || 0 : value // handles numbers, text, and checkboxes
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handles image file upload
    const file = e.target.files?.[0]; // get the first file
    if (file) {
      setImageFile(file); // save file to state
      const reader = new FileReader(); // reads file to show preview
      reader.onload = () => setPreviewUrl(reader.result?.toString() || ''); // set preview url
      reader.readAsDataURL(file); // read file as data url
    }
  };

  const useDefaultImage = () => {
    // resets image to default
    setImageFile(undefined); // clear uploaded file
    setPreviewUrl('/images/image-standard.png'); // set default image preview
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // handles form submission
    e.preventDefault(); // stop page reload
    setError(''); // clear previous errors
    try {
      setIsUploading(true); // show loading spinner
      const imageUrl = imageFile ? await FilesService.uploadFile(imageFile) : product.imageUrl; // upload image if provided
      setIsUploading(false);

      if (productId) {
        await ProductService.updateProduct(parseInt(productId), { ...product, imageUrl }); // send updated product to server
        navigate(`/products/${productId}`); // go back to product page
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.'); // show error if update fails
      setIsUploading(false); // hide spinner
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Update Product</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>} {/* show error if exists */}
      <form onSubmit={handleSubmit}>
        {Object.entries(initialProduct).map(([key, value]) => (
          key === 'imageUrl' ? null : typeof value === 'boolean' ? ( // skip imageUrl, handle checkboxes
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  name={key}
                  checked={product[key as keyof typeof product] as boolean} // checkbox state
                  onChange={handleChange}
                />
              }
              label={<Typography sx={{ color: 'black' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>} // capitalize label
            />
          ) : (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)} // capitalize label
              name={key}
              fullWidth
              required
              type={key === 'price' || typeof value === 'number' ? 'number' : 'text'} // number for price/ram/storage
              value={product[key as keyof typeof product]} // bind input to state
              onChange={handleChange}
              sx={{ mb: 2 }}
              inputProps={key === 'price' ? { step: '0.01' } : undefined} // allow decimals for price
            />
          )
        ))}
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1">Product Image</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={useDefaultImage} disabled={isUploading}>Use Default Image</Button> {/* reset to default */}
            <Button variant="outlined" color="secondary" component="label" disabled={isUploading}>
              Add Your Own Picture
              <input type="file" accept="image/*" hidden onChange={handleFileChange} /> {/* upload image */}
            </Button>
          </Box>
          {isUploading && <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>} {/* show spinner */}
          {previewUrl && !isUploading && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Image Preview:</Typography>
              <img src={previewUrl} alt="Product preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} /> {/* show preview */}
            </Box>
          )}
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>Update Product</Button> {/* submit button */}
      </form>
    </Box>
  );
}

export default UpdateProduct;