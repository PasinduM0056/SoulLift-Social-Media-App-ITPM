import React, { useState, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import BusinessProfileForm from "./BusinessProfileForm";
import { useNavigate } from 'react-router-dom';

const SettingsPage = ({ isBusiness }) => {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const logout = useLogout();
  const [showForm, setShowForm] = useState(false);
  const [isBusinessAccount, setIsBusinessAccount] = useState(isBusiness);

  useEffect(() => {
    // Fetch isBusiness status when component mounts
    checkIsBusiness();
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

  const toggleForm = () => {
    setShowForm(!showForm);
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
    navigate("/udhome");
  };

  return (
    <>
      {!showForm ? (
        <>
          <Text my={1} fontWeight={"bold"}>
            Freeze Your Account
          </Text>
          <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
          <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
            Freeze
          </Button>
          <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
          {isBusinessAccount ? (
            <Button size={"sm"} colorScheme="green" onClick={handleOpenDashboard}>
              Open Dashboard
            </Button>
          ) : (
            <Button size={"sm"} colorScheme="red" onClick={toggleForm}>
              Switch to Business Profile
            </Button>
          )}
        </>
      ) : (
        <BusinessProfileForm toggleForm={toggleForm} />
      )}
    </>
  );
};

export default SettingsPage;
