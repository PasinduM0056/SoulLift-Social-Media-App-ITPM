import React from "react";
import {
  Box,
  Image,
  Badge,
  Flex,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductCard = ({ product, ProductBy }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg={colorMode === "light" ? "white" : "gray.800"}
    >
      <Image src={product.image} alt={product.name} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color={colorMode === "light" ? "gray.600" : "gray.400"}
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {product.category}
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {product.name}
        </Box>

        <Box>
          <Text mt="1" fontSize="sm">
            {product.description}
          </Text>
        </Box>

        <Flex mt="2" alignItems="center">
          <Box as="span" color="gray.600" fontSize="sm">
            {product.rating} ({product.reviews} reviews)
          </Box>
          <Box ml="2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <IconButton
                  key={i}
                  icon={i < product.rating ? <FaStar /> : <FaRegStar />}
                  color={i < product.rating ? "yellow.400" : "gray.200"}
                  size="xs"
                  variant="ghost"
                  aria-label="rating"
                  pointerEvents="none"
                  _hover={{ color: "yellow.400" }}
                />
              ))}
          </Box>
        </Flex>

        <Box mt="2">
          <Text fontWeight="semibold" fontSize="lg">
            ${product.price}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
