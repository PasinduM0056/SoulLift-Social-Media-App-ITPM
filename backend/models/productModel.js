import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		productName: {
            type: String,
        },
        productDescription: {
            type: String,
        },
        productPrice: {
            type: String,
        },
        productOfferPrice: {
            type: String,
        },
		productImg: {
			type: String,
		},
		likes: {
			// array of user ids
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		reviews: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				text: {
					type: String,
					required: true,
				},
				userProfilePic: {
					type: String,
				},
				username: {
					type: String,
				},
                rating: {
                    type: String,
                }
			},
		],

        buyers: [
            {
                userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
                buyerAddress: {
                    type: String,
                },
                buyerphoneNumber: {
                    type: String,
                }
            }
        ]
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;