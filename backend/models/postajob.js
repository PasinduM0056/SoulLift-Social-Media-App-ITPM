import mongoose from "mongoose";

const postaJobSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        default: "",
    },
    salary: {
        type: Number,
        default: 0, // Default value changed to 0
    },
    email: {
        type: String,
        default: "",
    },
    experience: {
        type: String,
        default: "",
    },
    other: {
        type: String,
        default: "",
    },
});

const PostJobs = mongoose.model("PJob", postaJobSchema);

export default PostJobs;
