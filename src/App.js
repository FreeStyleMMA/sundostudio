import './App.css';
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import StudioPicturePage from './pages/StudioPicturePage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import RentalPage from './pages/RentalPage';
import SchedulePage from './pages/SchedulePage';
import EquipmentAddPage from './pages/EquipmentAddPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './auth/ProtectedRoute';

import { AuthProvider } from './auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Studio" element={<StudioPicturePage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Rental" element={<RentalPage />} />
          <Route path="/Map" element={<MapPage />} />
          {/* 로그인 필요 */}
          <Route element={<ProtectedRoute allowedRoles={["MEMBER", "ADMIN"]} />}>
            <Route path="/Schedule" element={<SchedulePage />} />
          </Route>
          {/* 관리자 권한 필요 */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/EquipmentAddPage" element={<EquipmentAddPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
