import React from 'react';
import './css/style.css';
import { Box, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import Header from "./components/Header";
import HeaderB from './components/HeaderB';
import UDSideBar from "./components/udComponents/UDSideBar";
import HomePage from "./pages/HomePage";
import BusinessPage from './pages/BusinessPage';
import AuthPage from "./pages/AuthPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import ProductPage from './pages/ProductPage';
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import CreatePost from "./components/CreatePost";
import UDHomePage from "./pages/udPages/UDHomePage";
import UDProductPage from './pages/udPages/UDProductPage';
import UDAdvertisementPage from './pages/udPages/UDAdvertisementPage';
import UDSalesPage from './pages/udPages/UDSalesPage';
import UDAddAnalysePage from './pages/udPages/UDAddAnalysePage';
import UDSalesAnalysePage from './pages/udPages/UDSalesAnalysePage';
import UDProfilePage from './pages/udPages/UDProfilePage';
import UDChatPage from './pages/udPages/UDChatPage';
import UDSettingsPage from './pages/udPages/UDSettingsPage';
import AdminReviewPage from './pages/AdminReviewPage';

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  return (
    <Box position="relative" w='full'>

      <Container maxW={"850px"}>
        {(pathname === '/' || pathname === '/business' || pathname === '/auth' || pathname === '/update' || pathname === '/chat' || pathname === '/settings' || pathname === '/:username/post/:pid' || pathname === '/:username/product/:pid' || pathname === '/:username') && <Header />}
        {(pathname === '/' || pathname === '/business' || pathname === '/update' || pathname === '/chat' || pathname === '/settings' || pathname === '/:username/post/:pid' || pathname === '/:username/product/:pid' || pathname === '/:username') && <HeaderB />}

        <Routes>
          <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path='/business' element={user ? <BusinessPage /> : <Navigate to='/auth' />} />
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
          <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
          <Route
            path='/:username'
            element={user ? (
              <>
                {(pathname !== '/udhome' && pathname !== '/udproduct' && pathname !== '/adminreview') && <UserPage />}
                {(pathname !== '/udhome' && pathname !== '/udproduct' && pathname !== '/adminreview') && <CreatePost />}
              </>
            ) : (
              <UserPage />
            )}
          />
          <Route path='/:username/post/:pid' element={<PostPage />} />
          <Route path='/:username/product/:pid' element={<ProductPage />} />
          <Route path='/chat' element={user ? <ChatPage /> : <Navigate to="/auth" />} />
          <Route path='/settings' element={user ? <SettingsPage isBusiness={user.isBusiness} /> : <Navigate to="/auth" />} />
        </Routes>
      </Container>

      <Container className='grid-container' maxW="1700px">
      {(pathname === '/userDashboard/:username/udhome' || pathname === '/userDashboard/:username/udposts' || pathname === '/userDashboard/:username/udproduct' || pathname === '/userDashboard/:username/udadvertisement' || pathname === '/userDashboard/:username/udsales' || pathname === '/userDashboard/:username/udaddanalyse' || pathname === '/userDashboard/:username/udprofile' || pathname === '/userDashboard/:username/udsettings' ) && <UDSideBar />}
        <Routes>
            <Route path='/userDashboard/:username/udhome' element={<UDHomePage />} />
            <Route path='/userDashboard/:username/udproduct' element={<UDProductPage />} />
            <Route path='/userDashboard/:username/udadvertisement' element={<UDAdvertisementPage />} />
            <Route path='/userDashboard/:username/udproduct/:pid' element={<UDSalesPage />} />
            <Route path='/userDashboard/:username/udaddanalyse' element={<UDAddAnalysePage />} />
            <Route path='/userDashboard/:username/udprofile' element={<UDProfilePage />} />
            <Route path='/userDashboard/:username/udchats' element={<UDChatPage />} />
            <Route path='/userDashboard/:username/udsettings' element={<UDSettingsPage />} />
          
          <Route path='/adminreview' element={<AdminReviewPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
