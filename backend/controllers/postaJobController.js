
import mongoose from "mongoose";
import PostJobs from '../models/postajob.js';


// Controller function to handle saving details to the database
const saveJobDetails = async (req, res) => {
    try {
        // Extract job details from the request body
        const { jobTitle, salary, email, experience, other } = req.body;

        // Create a new document using the PostJobs model
        const newJob = new PostJobs({
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

export { saveJobDetails };
