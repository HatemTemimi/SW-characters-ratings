
import Container from '@mui/material/Container'
import Navbar from './Layout/Navbar'
import CharacterGrid from './Characters/CharacterGrid/CharacterGrid'
import {
  Navigate,
} from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import Ratings from './Ratings/RatingsByUser';
import {BrowserRouter, Routes,Route } from "react-router-dom"
import { useAuthContext } from 'hooks/useAuthContext';
import ErrorPage from './Error/Error';
import ErrorNotFound from './Error/404';
import { ToastContainer } from 'react-toastify';

function App() {
  const { user } =   useAuthContext()
  return (
        <Container fixed={true}>
          <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route index
                element={user ? <CharacterGrid/> : <Navigate to="/login"></Navigate>}
                errorElement={<ErrorPage/>}
            />
              <Route path="/ratings" element={<Ratings/>} errorElement={<ErrorPage/>} />
              <Route path="/login" element={!user ? <Login/> : <Navigate to="/"></Navigate>} />
              <Route path="/register"
                element={!user ? <Register/> : <Navigate to="/"></Navigate>} />
              <Route path="*" element={<ErrorNotFound/>}/>
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Container>
  )
}

export default App
