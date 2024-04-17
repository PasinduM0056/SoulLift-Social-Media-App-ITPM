import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Textarea,
  Heading,
  Alert,
} from "@chakra-ui/react";
import userAtom from "../../atoms/userAtom";
import { useRecoilState } from "recoil";
import "./postajob.css";
function PostaJob() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    salary: "",
    email: "",
    experience: "",
    other: "",
  });

  const onSubmit = async () => {
    try {
      await axios.post("/api/jobpost/Post-a-job", formData);
      setFormData({
        jobTitle: "",
        salary: "",
        email: "",
        experience: "",
        other: "",
      });
    } catch (error) {
      console.error("Error adding job post:", error);
    }
  };

  return (
    <Grid container xs={12}>
      <Grid item xs={0}>
        <div
          className="job-post-up-container"
          style={{
            minWidth: "230vh",
            height: "40vh",
            marginLeft: "-40vh",
          }}
        >
          <div class="job-post-tooltip-container">
            <span class="job-post-tooltip-1">Provide accurate information.</span>
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
            }}
          >
            When crafting a job post, employees should aim for clarity and
            appeal, capturing both skills needed and company culture's feel.
            Accuracy and inclusivity pave the path,
            <br /> ensuring the right candidates find their way to our staff.
          </h1>
        </div>
      </Grid>

      <div className="post-a-job-full-form">
        <div className="Post-a-job-form-container">
          <form
            className="Post-a-job-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="Post-a-job-form-group">
              <FormControl id="jobTitle">
                <FormLabel>Job title</FormLabel>
                <Input
                  placeholder="Enter job title"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>

              <FormControl id="salary">
                <FormLabel>Salary</FormLabel>
                <Input
                  placeholder="Enter salary"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>

              <FormControl id="experience">
                <FormLabel>Experience level</FormLabel>
                <Input
                  placeholder="Enter experience level"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>

              <FormControl id="other">
                <FormLabel>Other requirements</FormLabel>
                <Textarea
                  placeholder="Enter other requirements"
                  value={formData.other}
                  onChange={(e) =>
                    setFormData({ ...formData, other: e.target.value })
                  }
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
