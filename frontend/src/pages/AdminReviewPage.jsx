// AdminReviewPage.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Divider,
  Flex,
  Center
} from '@chakra-ui/react';

const AdminReviewPage = () => {
  const [users, setUsers] = useState([]);
  const [orgUser, setOrgUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersWithBusinessProfiles();
    fetchUserWithOrganizationProfile();
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
  //organization
  const fetchUserWithOrganizationProfile = async () => {
    try {
      const response = await fetch('/api/admin/users/organization-profiles');
      if (!response.ok) {
        throw new Error('Failed to fetch users with organization profiles');
      }
      const data = await response.json();
      setOrgUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users with organization profiles:', error);
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
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, isBusiness: true } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error approving business profile:', error);
    }
  };

  //organization
  const approveOrganizationProfiles = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/approve-organization-profile/${userId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to approve business profile');
      }
      // Update the local state or show a success message
      const updatedUsersss = orgUser.map(userss =>
        userss._id === userId ? { ...userss, isOrganization: true } : userss
      );
      setOrgUsers(updatedUsersss);
    } catch (error) {
      console.error('Error approving business profile:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
        <div style={{ textAlign: 'center' }}>
      <Heading as="h2" mb="4">Admin Review Page</Heading>
    </div>
    <Box>
      {users.map(user => (
        <Box key={user._id} mb="4">
          <Text>
            <strong>Name:</strong> {user.businessName}
          </Text>
          <Text>
            <strong>Address:</strong> {user.businessAddress}
          </Text>
          <Text>
            <strong>About:</strong> {user.businessAbout}
          </Text>
          <Text>
            <strong>ID Number:</strong> {user.idNumber}
          </Text>
          {user.isBusiness ? (
            <Text>Status: Approved</Text>
          ) : (
            <Button
              onClick={() => approveBusinessProfile(user._id)}
              colorScheme="blue"
              mt="2"
            >
              Approve Business Profile
            </Button>
          )}
          <Divider mt="4" />
        </Box>
      ))}
    </Box>


    <Box>
      {orgUser.map(userss => (
        <Box key={userss._id} mb="4">
          <Text>
            <strong>Organization Name:</strong> {userss.OrganizationName}
          </Text>
          <Text>
            <strong>Organization Address:</strong> {userss.OrganizationAddress}
          </Text>
          <Text>
            <strong>Organization About:</strong> {userss.OrganizationAbout}
          </Text>
          <Text>
            <strong>ID Number:</strong> {userss.IDnumber}
          </Text>
          {userss.isOrganization ? (
            <Text>Status: Approved</Text>
          ) : (
            <Button
              onClick={() => approveOrganizationProfiles(userss._id)}
              colorScheme="blue"
              mt="2"
            >
              Approve organization Profile
            </Button>
          )}
          <Divider mt="4" />
        </Box>
      ))}
    </Box>
  </Box>
  );
};

export default AdminReviewPage;
