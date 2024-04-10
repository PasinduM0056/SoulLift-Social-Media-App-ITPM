import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Textarea, VStack, FormErrorMessage } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";

const BusinessProfileForm = ({ toggleForm }) => {
  const showToast = useShowToast();
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    businessAbout: "",
    idNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    // Restrict input to numbers only for ID Number
    if (name === "idNumber") {
      newValue = value.replace(/\D/g, ""); // Remove non-digit characters
      // Limit length to 12 characters
      newValue = newValue.slice(0, 12);
    }
    setFormData({ ...formData, [name]: newValue });
    // Clear error message when user starts typing
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    // Validate form fields
    if (!formData.businessName) {
      errors.businessName = "Business Name is required";
    }
    if (!formData.businessAddress) {
      errors.businessAddress = "Business Address is required";
    }
    if (!formData.businessAbout) {
      errors.businessAbout = "About the Business is required";
    }
    if (!formData.idNumber) {
      errors.idNumber = "ID Number is required";
    } else if (formData.idNumber.length !== 12) {
      errors.idNumber = "ID Number must be 12 digits long";
    }

    if (Object.keys(errors).length > 0) {
      // If there are errors, set them and prevent form submission
      setFormErrors(errors);
    } else {
      try {
        // Send form data to backend for updating user profile
        const res = await fetch("/api/users/business-profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.ok) {
          showToast("Success", "Business profile updated successfully", "success");
          toggleForm(); // Close the form
        } else {
          showToast("Error", data.error || "Failed to update business profile", "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl id="businessName" isRequired isInvalid={!!formErrors.businessName}>
          <FormLabel>Business Name</FormLabel>
          <Input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
          />
          <FormErrorMessage>{formErrors.businessName}</FormErrorMessage>
        </FormControl>
        <FormControl id="businessAddress" isRequired isInvalid={!!formErrors.businessAddress}>
          <FormLabel>Business Address</FormLabel>
          <Input
            type="text"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
          />
          <FormErrorMessage>{formErrors.businessAddress}</FormErrorMessage>
        </FormControl>
        <FormControl id="businessAbout" isRequired isInvalid={!!formErrors.businessAbout}>
          <FormLabel>About the Business</FormLabel>
          <Textarea
            name="businessAbout"
            value={formData.businessAbout}
            onChange={handleChange}
          />
          <FormErrorMessage>{formErrors.businessAbout}</FormErrorMessage>
        </FormControl>
        <FormControl id="idNumber" isRequired isInvalid={!!formErrors.idNumber}>
          <FormLabel>ID Number</FormLabel>
          <Input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
          <FormErrorMessage>{formErrors.idNumber}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
        <Button colorScheme="gray" onClick={toggleForm}>
          Cancel
        </Button>
      </VStack>
    </form>
  );
};

export default BusinessProfileForm;
