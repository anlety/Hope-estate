import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


// Import components
import Header from "./components/Header";
import PrivateRoute from './components/PrivateRoute';

// import pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import ForgotPassword from './pages/ForgotPassword';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// import toastify
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Router>

    
    <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/offers' element={<Offers />} />
      <Route path='/profile' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
    </Router>
    <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  );
}

export default App;
