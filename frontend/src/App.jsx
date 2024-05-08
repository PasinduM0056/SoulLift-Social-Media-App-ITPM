import React from "react";
import "./css/style.css";
import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import Header from "./components/Header";
import HeaderB from "./components/HeaderB";
import UDSideBar from "./components/udComponents/UDSideBar";
import HomePage from "./pages/HomePage";
import BusinessPage from "./pages/BusinessPage";
import AuthPage from "./pages/AuthPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import ProductPage from "./pages/ProductPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import CreatePost from "./components/CreatePost";
import UDHomePage from "./pages/udPages/UDHomePage";
import UDProductPage from "./pages/udPages/UDProductPage";
import UDAdvertisementPage from "./pages/udPages/UDAdvertisementPage";
import UDSalesPage from "./pages/udPages/UDSalesPage";
import UDAddAnalysePage from "./pages/udPages/UDAddAnalysePage";
import UDSalesAnalysePage from "./pages/udPages/UDSalesAnalysePage";
import UDProfilePage from "./pages/udPages/UDProfilePage";
import UDChatPage from "./pages/udPages/UDChatPage";
import UDSettingsPage from "./pages/udPages/UDSettingsPage";
import AdminReviewPage from "./pages/AdminReviewPage";
import OrganizationHompage from "./pages/organizationPages/OrganizationHompage";
import CreateAposts from "./pages/organizationPages/CreateApost";
import PostaJob from "./pages/organizationPages/PostaJob";
import UpdateOrganization from "./pages/UpdateOrganizatinInfo";
import OrganizationPage from "./pages/OrganizationJobPage";
import JobApplicationForm from "./pages/organizationPages/JobApplicationForm";
import CandidatesShortlisting from "./pages/organizationPages/Candidates-shortlisting";
import Shortlistedcandidates from "./pages/organizationPages/Shortlisted-candidates";
import PostedJobs from "./pages/organizationPages/postedJobs";
import TermsAndConditions from "./pages/TermsAndConditions";

import CDSideBar from "./components/udComponents/CDSideBar";
import ConsultantPage from "./pages/ConsultantPage";
import PackagePage from "./pages/PackagePage";
import CDHomePage from "./pages/cdPages/CDHomePage";
import CDPackagePage from "./pages/cdPages/CDPackagePage";
import CDAdvertisementPage from "./pages/cdPages/CDAdvertisementPage";
import CDBuyersPage from "./pages/cdPages/CDBuyersPage";
import CDAddAnalysePage from "./pages/cdPages/CDAddAnalysePage";
import CDBuyersAnalysePage from "./pages/cdPages/CDBuyersAnalysePage";
import CDProfilePage from "./pages/cdPages/CDProfilePage";
import CDChatPage from "./pages/cdPages/CDChatPage";
import CDSettingsPage from "./pages/cdPages/CDSettingPage";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Box>
      <Box position="relative" w="full">
        {/* {( pathname === '/:Job-application-form/:id' ||pathname === '/organization-job' ||pathname === '/' ||pathname=== '/business'|| pathname === '/auth' || pathname === '/update' || pathname === '/chat' || pathname === '/settings' || pathname ==='/:username/post/:pid' || pathname === '/:username/product/:pid' || pathname === '/:username') && <Header />}
        {(  pathname === '/:Job-application-form/:id' ||pathname === '/organization-job' || pathname === '/' ||pathname=== '/business'|| pathname === '/update' || pathname === '/chat' || pathname === '/settings' || pathname ==='/:username/post/:pid' || pathname === '/:username/product/:pid' || pathname === '/:username') && <HeaderB />}
         */}

        <Container maxW={"1000px"}>
          {(pathname === "/:Job-application-form/:id" ||
            pathname === "/organization-job" ||
            pathname === "/" ||
            pathname === "/business" ||
            pathname === "/auth" ||
            pathname === "/update" ||
            pathname === "/chat" ||
            pathname === "/settings" ||
            pathname === "/:username/post/:pid" ||
            pathname === "/:username/product/:pid" ||
            pathname === "/:username") && <Header />}
          {(pathname === "/:Job-application-form/:id" ||
            pathname === "/organization-job" ||
            pathname === "/" ||
            pathname === "/business" ||
            pathname === "/update" ||
            pathname === "/chat" ||
            pathname === "/settings" ||
            pathname === "/:username/post/:pid" ||
            pathname === "/:username/product/:pid" ||
            pathname === "/:username") && <HeaderB />}

          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/business"
              element={user ? <BusinessPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/consultant"
              element={user ? <ConsultantPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to="/" />}
            />
            <Route
              path="/update"
              element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/organization-job"
              element={user ? <OrganizationPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/:Job-application-form/:id"
              element={user ? <JobApplicationForm /> : <Navigate to="/auth" />}
            />

            <Route
              path="/:username"
              element={
                user ? (
                  <>
                    {pathname !== "/udhome" &&
                      pathname !== "/udproduct" &&
                      pathname !== "/adminreview" && <UserPage />}
                    {pathname !== "/udhome" &&
                      pathname !== "/udproduct" &&
                      pathname !== "/adminreview" && <CreatePost />}
                  </>
                ) : (
                  <UserPage />
                )
              }
            />
            <Route path="/:username/post/:pid" element={<PostPage />} />
            <Route path="/:username/product/:pid" element={<ProductPage />} />
            <Route
              path="/chat"
              element={user ? <ChatPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/settings"
              element={
                user ? (
                  user.isBusiness ? (
                    <SettingsPage isBusiness />
                  ) : user.isOrganization ? (
                    <SettingsPage isOrganization />
                  ) : (
                    <SettingsPage />
                  )
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />

            <Route path="/terms" element={<TermsAndConditions />} />
            {/* Add the new route for Organization Homepage */}
            <Route
              path="/organization-Home"
              element={<OrganizationHompage />}
            />
            <Route path="/Create-a-post" element={<CreateAposts />} />
            <Route
              path="/Candidate-Shortlisting"
              element={<CandidatesShortlisting />}
            />
            <Route path="/Post-a-job" element={<PostaJob />} />
            <Route
              path="/Update-Organization"
              element={<UpdateOrganization />}
            />
            <Route
              path="/Shortlisted-Candidates"
              element={<Shortlistedcandidates />}
            />
            <Route path="/Posted-Jobs" element={<PostedJobs />} />
          </Routes>
        </Container>

        <Container className="grid-container" maxW="1700px">
          {(pathname === "/userDashboard/:username/udhome" ||
            pathname === "/userDashboard/:username/udposts" ||
            pathname === "/userDashboard/:username/udproduct" ||
            pathname === "/userDashboard/:username/udadvertisement" ||
            pathname === "/userDashboard/:username/udsales" ||
            pathname === "/userDashboard/:username/udaddanalyse" ||
            pathname === "/userDashboard/:username/udprofile" ||
            pathname === "/userDashboard/:username/udsettings") && (
            <UDSideBar />
          )}
          <Routes>
            <Route
              path="/userDashboard/:username/udhome"
              element={<UDHomePage />}
            />
            <Route
              path="/userDashboard/:username/udproduct"
              element={<UDProductPage />}
            />
            <Route
              path="/userDashboard/:username/udadvertisement"
              element={<UDAdvertisementPage />}
            />
            <Route
              path="/userDashboard/:username/udproduct/:pid"
              element={<UDSalesPage />}
            />
            <Route
              path="/userDashboard/:username/udaddanalyse"
              element={<UDAddAnalysePage />}
            />
            <Route
              path="/userDashboard/:username/udprofile"
              element={<UDProfilePage />}
            />
            <Route
              path="/userDashboard/:username/udchats"
              element={<UDChatPage />}
            />
            <Route
              path="/userDashboard/:username/udsettings"
              element={<UDSettingsPage />}
            />

            <Route path="/adminreview" element={<AdminReviewPage />} />
          </Routes>
        </Container>

        <Container className="grid-container" maxW="1700px">
          {(pathname === "/userDashboard/:username/cdhome" ||
            pathname === "/userDashboard/:username/cdposts" ||
            pathname === "/userDashboard/:username/cdpackage" ||
            pathname === "/userDashboard/:username/cdadvertisement" ||
            pathname === "/userDashboard/:username/cdbuyers" ||
            pathname === "/userDashboard/:username/cdaddanalyse" ||
            pathname === "/userDashboard/:username/cdprofile" ||
            pathname === "/userDashboard/:username/cdsettings") && (
            <CDSideBar />
          )}
          <Routes>
            <Route
              path="/userDashboard/:username/cdhome"
              element={<CDHomePage />}
            />
            <Route
              path="/userDashboard/:username/cdpackage"
              element={<CDPackagePage />}
            />
            <Route
              path="/userDashboard/:username/cdadvertisement"
              element={<CDAdvertisementPage />}
            />
            <Route
              path="/userDashboard/:username/cdproduct/:pid"
              element={<CDBuyersPage />}
            />
            <Route
              path="/userDashboard/:username/cdaddanalyse"
              element={<CDAddAnalysePage />}
            />
            <Route
              path="/userDashboard/:username/cdprofile"
              element={<CDProfilePage />}
            />
            <Route
              path="/userDashboard/:username/cdchats"
              element={<CDChatPage />}
            />
            <Route
              path="/userDashboard/:username/cdsettings"
              element={<CDSettingsPage />}
            />

            <Route path="/adminreview" element={<AdminReviewPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
