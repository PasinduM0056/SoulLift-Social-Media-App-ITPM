import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ODSideBar from "../../components/udComponents/ODSideBar";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Textarea,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import useShowToast from "../../hooks/useShowToast";
import "./updatePostedJobs.css";
const UpdatePostedJobs = () => {
  const { id } = useParams(); // Get the job ID from the URL parameters
  const navigate = useNavigate(); // Used to navigate to other pages
  const showToast = useShowToast(); // Custom hook for showing toasts

  // State for storing job details and loading status
  const [jobDetails, setJobDetails] = useState({
    submissionMethod: "",
    applicationDeadline: "",
    skills: "",
    jobAbout: "",
    responsibilites: "",
    qualifications: "",
    jobTitle: "",
    salary: "",
    email: "",
    experience: "",
    other: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Fetch the existing job details
        const response = await axios.get(`/api/jobpost/Get-jobs-by-id/${id}`);
        setJobDetails(response.data.job);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        showToast("Error fetching job details", "error");
      }
    };

    fetchJobDetails();
  }, [id, showToast]);

  const handleChange = (e) => {
    // Update the job details state when the input fields change
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      // Send a PUT request to update the job details
      await axios.put(`/api/jobpost/update-posted-jobs/${id}`, jobDetails);

      // Show a success toast
      showToast("Job details updated successfully", "success");

      // Navigate back to the posted jobs page
      navigate("/posted-jobs");
    } catch (error) {
      console.error("Error updating job details:", error);
      showToast("Error updating job details", "error");
    }
  };

  if (loading) {
    // Display a spinner while loading
    return <Spinner />;
  }

  return (
    <div>
      
   <ODSideBar />
   <Grid item xs={0}>
        <div
          className="job-post-up-container"
          style={{
            minWidth: "230vh",
            height: "40vh",
            marginLeft: "-10vh",
          }}
        >
          <div class="job-post-tooltip-container">
            <span class="job-post-tooltip-1">Provide accurate information</span>
            <span class="job-post-tooltip-2">Find the right candidates.</span>
            <span class="job-post-tooltip-3">Participate in challenges.</span>
            <span>Post a Job</span>
          </div>

          <h1
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",

              marginTop: "5vh",
              fontWeight: "700",
              marginLeft:'-20vh'
            }}
          >
            When crafting a job post, employees should aim for clarity and
      
            appeal, capturing both skills needed and       <br/>company culture's feel.<br/>
            Accuracy and inclusivity pave the path,
            <br /> ensuring the right candidates find their way to our staff.
          </h1>
        </div>
      </Grid>
      

      <div class="post-a-job-container noselect" style={{marginLeft:'40vh'}}>
        <div class="post-a-job-canvas">
          <div class="post-a-job-tracker post-a-job-tr-1"></div>
          <div class="post-a-job-tracker post-a-job-tr-2"></div>
          <div class="post-a-job-tracker post-a-job-tr-3"></div>
          <div class="post-a-job-tracker post-a-job-tr-4"></div>
          <div class="post-a-job-tracker post-a-job-tr-5"></div>
          <div class="post-a-job-tracker post-a-job-tr-6"></div>
          <div class="post-a-job-tracker post-a-job-tr-7"></div>
          <div class="post-a-job-tracker post-a-job-tr-8"></div>
          <div class="post-a-job-tracker post-a-job-tr-9"></div>
          <div class="post-a-job-tracker post-a-job-tr-10"></div>
          <div class="post-a-job-tracker post-a-job-tr-11"></div>
          <div class="post-a-job-tracker post-a-job-tr-12"></div>
          <div class="post-a-job-tracker post-a-job-tr-13"></div>
          <div class="post-a-job-tracker post-a-job-tr-14"></div>
          <div class="post-a-job-tracker post-a-job-tr-15"></div>
          <div class="post-a-job-tracker post-a-job-tr-16"></div>
          <div class="post-a-job-tracker post-a-job-tr-17"></div>
          <div class="post-a-job-tracker post-a-job-tr-18"></div>
          <div class="post-a-job-tracker post-a-job-tr-19"></div>
          <div class="post-a-job-tracker post-a-job-tr-20"></div>
          <div class="post-a-job-tracker post-a-job-tr-21"></div>
          <div class="post-a-job-tracker post-a-job-tr-22"></div>
          <div class="post-a-job-tracker post-a-job-tr-23"></div>
          <div class="post-a-job-tracker post-a-job-tr-24"></div>
          <div class="post-a-job-tracker post-a-job-tr-25"></div>
          <div id="post-a-job-card">
            <p id="post-a-job-prompt">
              Hover this card for check the details before post a job
            </p>
            <div className="post-a-job-instructions">
              <div className="post-a-job-title">
                <ul>
                  <li>
                    <strong>Define the Job Role:</strong> Clearly outline the
                    job responsibilities, required skills, and qualifications.
                  </li>
                  <li>
                    <strong>Include Essential Details:</strong> Specify job
                    title, location, work hours, and salary range (if
                    applicable).
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> Ensure your job posting
                    adheres to employment laws and regulations, including
                    anti-discrimination rules.
                  </li>
                  <li>
                    <strong>Consider Diversity and Inclusion:</strong> Use
                    inclusive language and encourage applicants from diverse
                    backgrounds.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    <div class="updatejob-form-container" style={{marginLeft:'45vh'}}>
      <form class="updatejob-form">
        <div class="updatejob-form-group">
          <Box p={4}>
            <VStack spacing={4}>
              <FormControl id="jobTitle">
                <FormLabel>Job Title</FormLabel>
                <Input
                  name="jobTitle"
                  value={jobDetails.jobTitle}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="applicationDeadline">
                <FormLabel>Application Deadline</FormLabel>
                <Input
                  name="applicationDeadline"
                  type="date"
                  value={jobDetails.applicationDeadline}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="skills">
                <FormLabel>Skills</FormLabel>
                <Textarea
                  name="skills"
                  value={jobDetails.skills}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="jobAbout">
                <FormLabel>About the Job</FormLabel>
                <Textarea
                  name="jobAbout"
                  value={jobDetails.jobAbout}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="submissionMethod">
                <FormLabel>Submission method</FormLabel>
                <Textarea
                  name="submissionMethod"
                  value={jobDetails.submissionMethod}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="responsibilites">
                <FormLabel>Responsibilities</FormLabel>
                <Textarea
                  name="responsibilites"
                  value={jobDetails.responsibilites}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Salary">
                <FormLabel>Salary</FormLabel>
                <Textarea
                  name="Salary"
                  value={jobDetails.salary}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="qualifications">
                <FormLabel>Qualifications</FormLabel>
                <Textarea
                  name="qualifications"
                  value={jobDetails.qualifications}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Company Email</FormLabel>
                <Textarea
                  name="email"
                  value={jobDetails.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="experience">
                <FormLabel>Expierience</FormLabel>
                <Textarea
                  name="experience"
                  value={jobDetails.experience}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="other">
                <FormLabel>Other</FormLabel>
                <Textarea
                  name="other"
                  value={jobDetails.other}
                  onChange={handleChange}
                />
              </FormControl>

              <Button colorScheme="teal" onClick={handleUpdate}>
                Update Job Details
              </Button>
            </VStack>
          </Box>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdatePostedJobs;
