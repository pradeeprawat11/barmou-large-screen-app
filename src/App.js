import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Payment from './pages/Payment/Payment';
import Review from './pages/Review/Review'
import './assets/styles/Global.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/review' element={<Review />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
