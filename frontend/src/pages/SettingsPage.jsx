import React, { useState, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import BusinessProfileForm from "./BusinessProfileForm";
import OrganizationProfileForm from "./OrganizationProfileForm";
import { useNavigate } from 'react-router-dom';
import userAtom from "./../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link } from 'react-router-dom';



const SettingsPage = ({ isBusiness , isOrganization }) => {
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const logout = useLogout();
  const [showForm, setShowForm] = useState(false);
  const [showFormOrg, setShowFormOrg] = useState(false);
  const [isBusinessAccount, setIsBusinessAccount] = useState(isBusiness);
  const [isOrganizationAccount, setIsOrganizationAccount] = useState(isOrganization); // Initialize state with the prop value
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch isBusiness status when component mounts
    checkIsBusiness();
    checkIsOrganization(); // Make sure to call checkIsOrganization as well
  }, []);

  const checkIsBusiness = async () => {
    try {
      const res = await fetch("/api/users/check-business", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }

      // Update isBusinessAccount state based on the response
      setIsBusinessAccount(data.isBusiness);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const checkIsOrganization = async () => {
    try {
      const res = await fetch("/api/users/check-organization", { // Assuming there's an endpoint to check organization status
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }

      // Update isOrganizationAccount state based on the response
      setIsOrganizationAccount(data.isOrganization);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleForms = () => {
    setShowFormOrg(!showFormOrg); // Corrected the function name
  };

  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account?")) return;

    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      if (data.success) {
        await logout();
        showToast("Success", "Your account has been frozen", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleOpenDashboard = () => {
    // Navigate to the /udhome route
    navigate("/:username/udhome");
  };
  

  return (
    <>
      {!showForm && !showFormOrg ? (
        <>
          <Text my={1} fontWeight={"bold"}>
            Freeze Your Account
          </Text>
          <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
          <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
            Freeze
          </Button>
          <Text my={1} fontWeight={"bold"}>
            Business Account
          </Text>
          {isBusinessAccount ? (
            <Text my={1}>Open your Business Dashboard</Text>
          ) : (
            <Text my={1}>Update your account to Business</Text>
          )}
          
          {isBusinessAccount ? (
            <Link to={`/userDashboard/${user.username}/udhome`}>
            <Button size="sm" colorScheme="green">
              Open Dashboard
            </Button>
          </Link>
          ) : (
            <Button size={"sm"} colorScheme="red" onClick={toggleForm}>
              Switch to Business Profile
            </Button>
          )}
          {isOrganizationAccount ? (
            <Button size={"sm"} colorScheme="green" onClick={handleOpenDashboard}>
              Open Dashboard
            </Button>
          ) : (
            <Button size={"sm"} colorScheme="red" onClick={toggleForms}>
              Switch to Organization Profile
            </Button>
          )}
        </>
      ) : (
        // Render the appropriate form based on the state
        <>
          {showForm && <BusinessProfileForm toggleForm={toggleForm} />}
          {showFormOrg && <OrganizationProfileForm toggleForm={toggleForms} />}
        </>
      )}
    </>
  );
};

export default SettingsPage;
