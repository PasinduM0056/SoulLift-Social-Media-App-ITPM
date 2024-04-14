import React from 'react';
import './css/style.css'
import { useState } from 'react';
import { Box, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import Header from "./components/Header";
import UDHeader from "./components/udComponents/UDHeader";
import UDSideBar from "./components/udComponents/UDSideBar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import CreatePost from "./components/CreatePost";
import UDHomePage from "./pages/udPages/UDHomePage";
import UDProductPage from './pages/udPages/UDProductPage';
import AdminReviewPage from './pages/AdminReviewPage';
import OrganizationHompage from './pages/organizationPages/organizationHompage'; // Import the OrganizationHomepage component
import CreateAposts from './pages/organizationPages/createApost';
import CandidatesShortlisting from './pages/organizationPages/candidatesShortlisting';
import PostaJob from './pages/organizationPages/PostaJob';
import UpdateOrganization from './pages/UpdateOrganizatinInfo';

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  return (
    <Box position="relative" w='full'>
      <Container maxW={"75000px"}>
        {(pathname === '/' || pathname === '/auth' || pathname === '/update' || pathname === '/chat' || pathname === '/settings' || pathname ==='/:username/post/:pid' || pathname === '/:username') && <Header />}
        <Routes>
          <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
          <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
          <Route
            path='/:username'
            element={
              user ? (
                <>
                  {(pathname !== '/udhome' && pathname !== '/udproduct' && pathname !== '/adminreview') && <UserPage />}
                  {(!user.isBusiness && pathname !== '/udhome' && pathname !== '/udproduct' && pathname !== '/adminreview') && <CreatePost />}
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path='/:username/post/:pid' element={<PostPage />} />
          <Route path='/chat' element={user ? <ChatPage /> : <Navigate to="/auth" />} />
          <Route path='/settings' element={user ? <SettingsPage SettingsPage isBusiness={user.isBusiness} /> : <Navigate to="/auth" />} />
          {/* Add the new route for Organization Homepage */}
          <Route path='/organization' element={<OrganizationHompage  />} />
          <Route path='/Create-a-post' element={<CreateAposts  />} />
          <Route path='/Candidate-Shortlisting' element={<CandidatesShortlisting  />} />
          <Route path='/Post-a-job' element={<PostaJob  />} />
          <Route path='/Update-Organization' element={<UpdateOrganization  />} />
        </Routes>
      </Container>
      
      <Container className='grid-container' maxW="1700px" >
        {(pathname === '/udhome' || pathname === '/udproduct' || pathname === '/adminreview') && <UDHeader OpenSidebar={OpenSidebar}/>}
        {(pathname === '/udhome' || pathname === '/udproduct' || pathname === '/adminreview') && <UDSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>}
        <Routes>
    
          <Route path='/udhome' element={<UDHomePage />} />
          <Route path='/udproduct' element={<UDProductPage />} />
          <Route path='/adminreview' element={<AdminReviewPage />} /> 
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
