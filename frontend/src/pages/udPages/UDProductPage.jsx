import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td,TableCaption } from "@chakra-ui/react"; // Assuming Button is imported from Chakra UI
import UDProduct from "../../components/UDProduct";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import productsAtom from "../../atoms/productAtom";
import CreateProduct from "../../components/CreateProduct";
import UDSideBar from "../../components/udComponents/UDSideBar";

const UDProductPage = () => {
    const { user, loading } = useGetUserProfile();
    const { username } = useParams();
    const showToast = useShowToast();
    
    const [products, setProducts] = useRecoilState(productsAtom);
    
    const [fetchingProducts, setFetchingProducts] = useState(true);

   

    useEffect(() => {
        const getProducts = async () => {
            if (!user) return;
            setFetchingProducts(true);
            try {
                const res = await fetch(`/api/products/user/${username}`);
                const data = await res.json();
                console.log(data);
                setProducts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setProducts([]);
            } finally {
                setFetchingProducts(false);
            }
        };

        getProducts();
    }, [username, showToast, setProducts, user]);

   

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;

    return (
        <Box paddingLeft="405px" paddingTop="100px">
        <CreateProduct paddingLeft="350px" paddingTop="150px" />
        <UDSideBar />
  
        <Table variant="striped" colorScheme="brand" size="sm">
        <TableCaption>All products</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric
  bg="blue.500"
  color="white">Product Name</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Product Description</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Product Price</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Product Offer</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Product Image</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Likes</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Reviews</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Sales</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Created At</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!fetchingProducts && products.length === 0 && (
              <Tr>
                <Td colSpan="6">User has no products.</Td>
              </Tr>
            )}
            {fetchingProducts && (
              <Tr>
                <Td colSpan="6">
                  <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                  </Flex>
                </Td>
              </Tr>
            )}
            {!fetchingProducts &&
              products.map((product) => (
                <UDProduct key={product._id} product={product} postedBy={product.postedBy} />
              ))}
          </Tbody>
        </Table>
      </Box>
    );
};

export default UDProductPage;
