
import mongoose from "mongoose";
import PostJobs from '../models/postajob.js';


// Controller function to handle saving details to the database
const saveJobDetails = async (req, res) => {
    try {
        // Extract job details from the request body
        const { submissionMethod, applicationDeadline, skills, jobAbout , responsibilites, qualifications , jobTitle, salary, email, experience, other } = req.body;

        // Create a new document using the PostJobs model
        const newJob = new PostJobs({
            submissionMethod,
            applicationDeadline,
            skills,
            jobAbout,
            responsibilites,
            qualifications,
            jobTitle,
            salary,
            email,
            experience,
            other
        });

        // Save the new document to the database
        await newJob.save();

        // Respond with success message
        res.status(201).json({ success: true, message: 'Job details saved successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error saving job details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Controller function to handle fetching all created jobs
const getAllJobs = async (req, res) => {
    try {
        // Query the database to find all job documents
        const jobs = await PostJobs.find();

        // Respond with the array of job documents
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching job details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Controller function to handle fetching a job by its ID
const getJobById = async (req, res) => {
    try {
        // Extract the job ID from the request parameters
        const id = req.params.id;

        // Query the database to find the job document by its ID
        const job = await PostJobs.findById(id);

        // Check if the job exists
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        // Respond with the job document
        res.status(200).json({ success: true, job });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching job by ID:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export { saveJobDetails, getAllJobs, getJobById};