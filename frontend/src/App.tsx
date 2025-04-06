import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductOverview from './pages/ProductOverview';
import Navbar from './components/NavBar';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';
import User from './pages/User';
import EditUser from './pages/UserEdit';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import Statistics from './pages/Statistics';
import Payment from './pages/Payment';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:id" element={<ProductOverview/>} />
        <Route path="/products/edit/:id" element={<UpdateProduct/>} />
        <Route path="/products/create" element={<CreateProduct/>} />
        <Route path="/user" element={<User />} />
        <Route path="/user/edit/:id" element={<EditUser />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;