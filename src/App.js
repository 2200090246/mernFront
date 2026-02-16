import './App.css';
import Nav from './components/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import AdminComponent from './components/AdminComponent';
import Login from './components/Login';
import AddEvent from './components/AddEvent';
import EventList from './components/EventList';
import UpdateEvent from './components/UpdateComponent';
import VerifyEmail from './components/VerifyEmail';
import Home from './components/Home';
import MyRegistrations from './components/MyRegistrations';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Home />} />
            <Route path='/events' element={<EventList />} />
            <Route path='/my-registrations' element={<MyRegistrations />} />
            <Route path='/logout' element={<h1>Logout Component</h1>} />
            <Route path='/profile' element={<h1>Profile Component</h1>} />

            <Route element={<AdminComponent />}>
              <Route path='/add' element={<AddEvent />} />
              <Route path='/update/:id' element={<UpdateEvent />} />
            </Route>
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify/:token' element={<VerifyEmail />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
