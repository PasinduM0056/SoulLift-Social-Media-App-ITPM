import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Product from "../components/Product";
import { useRecoilState } from "recoil";
import productsAtom from "../atoms/productAtom";
import SuggestedUsers from "../components/SuggestedUsers";


const BusinessPage = () => {
	const [products, setProducts] = useRecoilState(productsAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	useEffect(() => {
		const getFeedProducts = async () => {
				setLoading(true);
				setProducts([]);
			try {
				const res = await fetch("/api/products/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setProducts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedProducts();
	}, [showToast, setProducts]);

	return (
		<Flex gap='10' alignItems={"flex-start"}>
			<Box flex={70}>
				{!loading && products.length === 0 && <h1>Follow some Businesses to see the Products</h1>}

				{loading && (
					<Flex justify='center'>
						<Spinner size='xl' />
					</Flex>
				)}

		{Array.isArray(products) && products.map((product) => (
			<Product key={product._id} product={product} postedBy={product.postedBy} />
		))}
			</Box>
			<Box
				flex={30}
				display={{
					base: "none",
					md: "block",
				}}
			>
				<SuggestedUsers />
			</Box>
		</Flex>
	);
};

export default BusinessPage;
