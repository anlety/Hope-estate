import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


// Import components
import Header from "./components/Header";

// import pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import ForgotPassword from './pages/ForgotPassword';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
    <Router>

    
    <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/offers' element={<Offers />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
