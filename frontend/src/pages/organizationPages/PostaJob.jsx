import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, FormLabel, Grid, Input, Textarea, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function PostaJob() {
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({
    jobTitle: '',
    salary: '',
    email: '',
    experience: '',
    other: ''
  });

  const onSubmit = async (data) => {
    try {
      // Send data to the backend server using Axios post method
      await axios.post('/api/jobpost/Post-a-job', {
        jobTitle: data.jobTitle,
        salary: data.salary,
        email: data.email,
        experience: data.experience,
        other: data.other
      });
      
      // Reset the form after successful submission
      setFormData({
        jobTitle: '',
        salary: '',
        email: '',
        experience: '',
        other: ''
      });
    } catch (error) {
      console.error('Error adding job post:', error);
    }
  };
  

  return (
    <Grid container xs={12}>
      <Grid item xs={0}>
        <div style={{ backgroundColor: '#40c9ff', width: '250vh', height: '30vh', marginLeft: '-40vh' }}>
          <Heading as="h1" size="xl" style={{display:'flex', justifyContent:'center', marginLeft: '-30vh', marginTop:'5vh'}}>Post a Job</Heading>
          <h1 style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginLeft: '-10vh', marginTop: '5vh' }}>
            When crafting a job post, employees should aim for clarity and appeal,
            capturing both skills needed and company culture's feel.
            Accuracy and inclusivity pave the path, ensuring the right <br />
            candidates find their way to our staff.
          </h1>
        </div>
      </Grid>

      <div className='post-a-job-full-form'>
        <div className="Post-a-job-form-container">
          <form className="Post-a-job-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="Post-a-job-form-group">
              <FormControl id="jobTitle">
                <FormLabel>Job title</FormLabel>
                <Input
                  placeholder='Enter job title'
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  _placeholder={{ color: "gray.500" }}
                  type='text'
                 
                />
              </FormControl>

              <FormControl id="salary">
                <FormLabel>Salary</FormLabel>
                <Input
                  placeholder='Enter salary'
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  _placeholder={{ color: "gray.500" }}
                  type='text'
                
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder='Enter email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  _placeholder={{ color: "gray.500" }}
                  type='text'
                
                />
              </FormControl>

              <FormControl id="experience">
                <FormLabel>Experience level</FormLabel>
                <Input
                  placeholder='Enter experience level'
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  _placeholder={{ color: "gray.500" }}
                  type='text'
              
                />
              </FormControl>

              <FormControl id="other">
                <FormLabel>Other requirements</FormLabel>
                <Textarea
                  placeholder='Enter other requirements'
                  value={formData.other}
                  onChange={(e) => setFormData({ ...formData, other: e.target.value })}
                  _placeholder={{ color: "gray.500" }}
               
                />
              </FormControl>
            </div>
            <Button type="submit" colorScheme="blue" size="lg">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Grid>
  );
}

export default PostaJob;
