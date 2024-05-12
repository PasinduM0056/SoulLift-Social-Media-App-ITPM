import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Text,
  Button,
  Table,
  Tr,
  Td,
  Tbody,
  Avatar,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import ODSideBar from "../../components/udComponents/ODSideBar";
import "./organizationHome.css";

// Dummy data for analytics
const dummyAnalyticsData = {
  users: 1000,
  sessions: 5000,
  pageViews: 15000,
};

// Sample data for charts
const sampleLineChartData = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 200, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 278, pv: 3908, amt: 2000 },
  { name: "May", uv: 189, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 239, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 349, pv: 4300, amt: 2100 },
];

const sampleBarChartData = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 200 },
  { name: "Apr", uv: 278 },
  { name: "May", uv: 189 },
  { name: "Jun", uv: 239 },
  { name: "Jul", uv: 349 },
];

const samplePieChartData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 200 },
  { name: "Group D", value: 278 },
];

const OrganizationHomepage = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure(true);

  useEffect(() => {
    // Simulating API call to fetch analytics data
    setTimeout(() => {
      setAnalyticsData(dummyAnalyticsData);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Flex
      width="calc(100vw - 240px)"
      justifyContent="flex-start"
      style={{ marginLeft: "1vh" }}
    >
      <ODSideBar />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sidebar</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" alignItems="flex-start">
              <Text>Sidebar content goes here</Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box width="calc(100vw - 240px)">
        <Flex
          p={3}
          bg="blue.500"
          color="white"
          justify="space-between"
          align="center"
          marginLeft="-2vh"
        >
          <div className="analyticsDashboard" >
            <Heading>Analytics Dashboard</Heading>
          </div>
          <div className="Profileana">
            <Text>Profile</Text>
          </div>
        </Flex>

        <Box>
          <Flex
            justify="space-around"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              marginLeft: "30vh",
            }}
          >
            <Stat>
              <StatLabel>Currently working employees</StatLabel>
              <StatNumber>
                {loading ? <Spinner size="sm" /> : analyticsData.users}
              </StatNumber>
              <StatHelpText>Total users on the platform</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Sessions</StatLabel>
              <StatNumber>
                {loading ? <Spinner size="sm" /> : analyticsData.sessions}
              </StatNumber>
              <StatHelpText>Total sessions on the platform</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Page Views</StatLabel>
              <StatNumber>
                {loading ? <Spinner size="sm" /> : analyticsData.pageViews}
              </StatNumber>
              <StatHelpText>Total page views</StatHelpText>
            </Stat>
          </Flex>
          <br />
          <br />

          <Heading mt={8} mb={4} style={{marginLeft:'10vh'}}>
            Charts
          </Heading>

          <Flex justify="space-around">
            <Box width="30%">
              <Heading size="md" mb={4} style={{marginLeft:'10vh'}}>
                Line Chart
              </Heading>
              <LineChart width={300} height={200} data={sampleLineChartData}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </Box>
            <Box width="30%">
              <Heading size="md" mb={4}>
                Bar Chart
              </Heading>
              <BarChart width={300} height={200} data={sampleBarChartData}>
                <Bar dataKey="uv" fill="#8884d8" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </BarChart>
            </Box>
            <Box width="30%">
              <Heading size="md" mb={4}>
                Pie Chart
              </Heading>
              <PieChart width={300} height={200}>
                <Pie
                  data={samplePieChartData}
                  cx={150}
                  cy={100}
                  outerRadius={60}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </Box>
          </Flex>

          <Heading mt={8} mb={4} style={{ marginLeft: "35vh" }}>
            Your company's currently working employees
          </Heading>
          <div className="Emp-no-card">
        <div className="Emp-no-card__border"></div>
        <div className="Emp-no-card_title__container">
          <span className="Emp-no-card_title">Explosive Growth</span>
          <p className="Emp-no-card_paragraph">
            Perfect for your next content, leave to us and enjoy the result!
          </p>
        </div>
        <hr className="Emp-no-line" style={{ width: "100vh" }} />
        <Table variant="simple">
          <Tbody>
            <ul className="Emp-no-card__list" style={{ color: "white" }}>
              <Tr>
                <Td>
                  <Avatar
                    size="sm"
                    name="John Doe"
                    src="https://www.iconfinder.com/icons/2980617/avatar_girl_maid_people_person_profile_icon"
                  />
                </Td>
                <Td>John Doe</Td>
                <Td>john.doe@example.com</Td>
                <Td>0714925754</Td>
              </Tr>
              <Tr>
                <Td>
                  <Avatar size="sm" name="Jane Smith" src="avatar2.jpg" />
                </Td>
                <Td>Jane Smith</Td>
                <Td>jane.smith@example.com</Td>
                <Td>0714925754</Td>
              </Tr>
              <Tr>
                <Td>
                  <Avatar size="sm" name="Bob Johnson" src="avatar3.jpg" />
                </Td>
                <Td>Bob Johnson</Td>
                <Td>bob.johnson@example.com</Td>
                <Td>0714925754</Td>
              </Tr>
              <Tr>
                <Td>
                  <Avatar size="sm" name="Bob Johnson" src="avatar3.jpg" />
                </Td>
                <Td>Bob Johnson</Td>
                <Td>bob.johnson@example.com</Td>
                <Td>0714925754</Td>
              </Tr>
              <Tr>
                <Td>
                  <Avatar size="sm" name="Bob Johnson" src="avatar3.jpg" />
                </Td>
                <Td>Bob Johnson</Td>
                <Td>bob.johnson@example.com</Td>
                <Td>0714925754</Td>
              </Tr>
              <Tr>
                <Td>
                  <Avatar size="sm" name="Bob Johnson" src="avatar3.jpg" />
                </Td>
                <Td>Bob Johnson</Td>
                <Td>bob.johnson@example.com</Td>
                <Td>0714925754</Td>
              </Tr>
              <Tr>
                <Td>
                  <Avatar size="sm" name="Bob Johnson" src="avatar3.jpg" />
                </Td>
                <Td>Bob Johnson</Td>
                <Td>bob.johnson@example.com</Td>
                <Td>0714925754</Td>
              </Tr>
              <Tr>
                <Td>
                  <Avatar size="sm" name="Bob Johnson" src="avatar3.jpg" />
                </Td>
                <Td>Bob Johnson</Td>
                <Td>bob.johnson@example.com</Td>
                <Td>0714925754</Td>
              </Tr>
            </ul>
          </Tbody>
        </Table>
        <button className="Emp-no-button">Book a Call</button>
      </div>
        </Box>
      </Box>

    
    </Flex>
  );
};

export default OrganizationHomepage;
