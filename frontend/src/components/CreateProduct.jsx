import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const CreateProduct = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage modal open/close
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const onClose = () => {
    setIsOpen(false);
    setFormData({
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage: null,
    });
    setFormErrors({});
  };

  const onOpen = () => setIsOpen(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.productName) {
      errors.productName = 'Product Name is required';
    }
    if (!formData.productDescription) {
      errors.productDescription = 'Product Description is required';
    }
    if (!formData.productPrice) {
      errors.productPrice = 'Product Price is required';
    } else if (isNaN(formData.productPrice)) {
      errors.productPrice = 'Product Price must be a number';
    }
    if (!formData.productImage) {
      errors.productImage = 'Product Image is required';
    }

    if (Object.keys(errors).length === 0) {
      // Form is valid, you can submit it here
      console.log('Form submitted successfully:', formData);
      onClose();
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <Button
        top={10}
        left={5}
        bg={useColorModeValue('gray.300', 'gray.dark')}
        onClick={onOpen}
        size={{ base: 'sm', sm: 'md' }}
      >
        Create Product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl id="productName" isRequired isInvalid={!!formErrors.productName}>
                <FormLabel>Product Name</FormLabel>
                <Input type="text" name="productName" value={formData.productName} onChange={handleInputChange} />
                <FormErrorMessage>{formErrors.productName}</FormErrorMessage>
              </FormControl>

              <FormControl id="productDescription" isRequired isInvalid={!!formErrors.productDescription} mt={4}>
                <FormLabel>Product Description</FormLabel>
                <Textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                />
                <FormErrorMessage>{formErrors.productDescription}</FormErrorMessage>
              </FormControl>

              <FormControl id="productPrice" isRequired isInvalid={!!formErrors.productPrice} mt={4}>
                <FormLabel>Product Price</FormLabel>
                <Input
                  type="number"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleInputChange}
                />
                <FormErrorMessage>{formErrors.productPrice}</FormErrorMessage>
              </FormControl>

              <FormControl id="productImage" isRequired isInvalid={!!formErrors.productImage} mt={4}>
                <FormLabel>Product Image</FormLabel>
                <Input
                  type="file"
                  name="productImage"
                  onChange={(e) => setFormData({ ...formData, productImage: e.target.files[0] })}
                />
                <FormErrorMessage>{formErrors.productImage}</FormErrorMessage>
              </FormControl>

              <Button type="submit" mt={4} colorScheme="blue">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProduct;
