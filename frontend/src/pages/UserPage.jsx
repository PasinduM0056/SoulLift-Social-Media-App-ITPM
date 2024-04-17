import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Button } from "@chakra-ui/react"; // Assuming Button is imported from Chakra UI
import Post from "../components/Post";
import Product from "../components/Product";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import productsAtom from "../atoms/productAtom";

const UserPage = () => {
    const { user, loading } = useGetUserProfile();
    const { username } = useParams();
    const showToast = useShowToast();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [products, setProducts] = useRecoilState(productsAtom);
    const [fetchingPosts, setFetchingPosts] = useState(true);
    const [fetchingProducts, setFetchingProducts] = useState(true);
    const [displayPosts, setDisplayPosts] = useState(true); // State to track whether to display posts or products

    useEffect(() => {
        const getPosts = async () => {
            if (!user) return;
            setFetchingPosts(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();
                console.log(data);
                setPosts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setPosts([]);
            } finally {
                setFetchingPosts(false);
            }
        };

        getPosts();
    }, [username, showToast, setPosts, user]);

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

    const handleToggleDisplay = (displayType) => {
        if (displayType === "posts") {
            setDisplayPosts(true);
        } else if (displayType === "products") {
            setDisplayPosts(false);
        }
    };

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;

    return (
        <>
            <UserHeader user={user} />

            <Flex justifyContent="center" mt={4}>
                <Button
                    mr={4}
                    onClick={() => handleToggleDisplay("posts")}
                    colorScheme={displayPosts ? "blue" : "gray"}
                >
                    Posts
                </Button>
                <Button
					
                    onClick={() => handleToggleDisplay("products")}
                    colorScheme={!displayPosts ? "blue" : "gray"}
                >
                    Products
                </Button>
            </Flex>

            {displayPosts ? (
                <>
                    {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
                    {fetchingPosts && (
                        <Flex justifyContent={"center"} my={12}>
                            <Spinner size={"xl"} />
                        </Flex>
                    )}

                    {posts.map((post) => (
                        <Post key={post._id} post={post} postedBy={post.postedBy} />
                    ))}
                </>
            ) : (
                <>
                    {!fetchingProducts && products.length === 0 && <h1>User has no products.</h1>}
                    {fetchingProducts && (
                        <Flex justifyContent={"center"} my={12}>
                            <Spinner size={"xl"} />
                        </Flex>
                    )}

                    {products.map((product) => (
                        <Product key={product._id} product={product} postedBy={product.postedBy} />
                    ))}
                </>
            )}
        </>
    );
};

export default UserPage;
