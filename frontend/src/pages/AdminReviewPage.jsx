import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Divider,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
} from '@chakra-ui/react';

const AdminReviewPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    fetchUsersWithBusinessProfiles();
  }, []);

  const fetchUsersWithBusinessProfiles = async () => {
    try {
      const response = await fetch('/api/admin/users/business-profiles');
      if (!response.ok) {
        throw new Error('Failed to fetch users with business profiles');
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users with business profiles:', error);
    }
  };

  const approveBusinessProfile = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/approve-business-profile/${userId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to approve business profile');
      }
      // Update the local state or show a success message
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, isBusiness: true } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error approving business profile:', error);
    }
  };

  const handleAvatarClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <div style={{ textAlign: 'center' }}>
        <Heading as="h2" mb="10" mt="10" ml="100">
          Admin Review Page
        </Heading>
      </div>
      <Table variant="simple" ml="100">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Address</Th>
            <Th>About</Th>
            <Th>Company Name</Th>
            <Th>Company About</Th>
            <Th>Identity Verify</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user.name}</Td>
              <Td>{user.address}</Td>
              <Td>{user.idNumber}</Td>
              <Td>{user.companyName}</Td>
              <Td>{user.companyAbout}</Td>
              <Td>
                <Avatar
                  src={user.identityVerify}
                  size={{
                    base: 'md',
                    md: 'xl',
                  }}
                  onClick={() => handleAvatarClick(user.identityVerify)}
                  cursor="pointer"
                />
              </Td>
              <Td>{user.isBusiness ? 'Approved' : 'Pending'}</Td>
              <Td>
                {!user.isBusiness && (
                  <Button onClick={() => approveBusinessProfile(user._id)} colorScheme="blue">
                    Approve
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for displaying image */}
      <Modal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedImage} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminReviewPage;
