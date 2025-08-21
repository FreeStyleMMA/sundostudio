import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudioPicturePage from './pages/StudioPicturePage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import RentalPage from './pages/RentalPage';
import SchedulePage from './pages/SchedulePage';
import EquipmentAddPage from './pages/EquipmentAddPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Studio" element={<StudioPicturePage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Rental" element={<RentalPage />} />
        <Route path="/Schedule" element={<SchedulePage />} />
        <Route path="/Map" element={<MapPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/EquipmentAddPage" element={<EquipmentAddPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
