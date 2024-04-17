import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";

const ProductComment = ({ review, lastReview }) => {
	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={review.userProfilePic} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{review.username}
						</Text>
					</Flex>
					<Text>{review.text}</Text>
				</Flex>
			</Flex>
			{!lastReview ? <Divider /> : null}
		</>
	);
};

export default ProductComment;
