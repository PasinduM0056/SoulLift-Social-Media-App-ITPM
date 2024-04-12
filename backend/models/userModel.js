import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			minLength: 6,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
		followers: {
			type: [String],
			default: [],
		},
		following: {
			type: [String],
			default: [],
		},
		bio: {
			type: String,
			default: "",
		},
		isFrozen: {
			type: Boolean,
			default: false,
		},
		isBusiness: {
			type: Boolean,
			default: false,
		},
		businessName: {
			type: String,
			default: "",
		},
		  businessAddress: {
			type: String,
			default: "",
		},
		  businessAbout: {
			type: String,
			default: "",
		},
		  idNumber: {
			type: String,
			default: "",
		},
		isOrganization: {
			type: Boolean,
			default: false,
		},
		OrganizationName: {
			type: String,
			default: "",
		},
		OrganizationAddress: {
			type: String,
			default: "",
		},
		OrganizationAbout: {
			type: String,
			default: "",
		},
		IDnumber: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
