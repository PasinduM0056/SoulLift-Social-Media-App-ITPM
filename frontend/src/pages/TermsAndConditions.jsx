import React from 'react';
import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

function TermsAndConditions() {
  return (
    <Box p="6">
      <Heading as="h1" size="xl" mb="4">
        Terms and Conditions
      </Heading>
      <Text fontSize="lg" mb="4">
        Please read these terms and conditions carefully before using our
        platform.        
      </Text>
      <Text>
      Welcome to our depression support social media platform, dedicated to providing a safe and supportive space for individuals struggling with depression. Our platform offers various features, including user-generated content sharing, consultant services, a marketplace, and job opportunities for consultants.
      </Text>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
            User Accounts
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Section 2
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Section 3
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default TermsAndConditions;
