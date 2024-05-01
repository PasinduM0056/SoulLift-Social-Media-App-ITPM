import Candidates from "../models/CandidateModel.js";

const addCandidate = async (req, res) => {
    try {
        // Extract candidate details from the request body
        const { CandidateName, CandidateNo, CandidateEmail,messagetoManager  , job  } = req.body;

        // Create a new candidate document using the Candidates model
        const newCandidate = new Candidates({
            CandidateName,
            CandidateNo,
            CandidateEmail,
            messagetoManager,
            job: {
                applicationDeadline: job.applicationDeadline,
                jobAbout: job.jobAbout,
                responsibilites: job.responsibilites,
                jobTitle: job.jobTitle,
                email: job.email
            }
        });

        // Save the new candidate document to the database
        await newCandidate.save();

        // Respond with success message
        return res.status(201).json({ success: true, message: 'Candidate details saved successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error saving candidate details:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Function to retrieve all candidates from the database
const getAllCandidates = async (req, res) => {
    try {
      // Retrieve all candidates from the database
      const candidates = await Candidates.find();
      return res.status(200).json(candidates);
      // Respond with the retrieved candidates
      return res.status(200).json({ success: true, candidates });
    } catch (error) {
      // Handle errors that occur during the process
      console.error("Error retrieving candidates:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

export  {addCandidate, getAllCandidates};
