import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button } from "@chakra-ui/react";
import chartPost from "../components/chartPost";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import CreatePost from "../components/CreatePost";
import ChartPost from "../components/chartPost";
import html2pdf from 'html2pdf.js';

const PostChartPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const [pdfMode, setPdfMode] = useState(false);

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

  const generateReport = () => {
    // Logic for generating report
    // For now, let's just toggle the pdfMode state
    setPdfMode(true);

    // Generate PDF
    const element = document.getElementById('pdf-content');
    html2pdf().from(element).save();
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
    <Box width="60vw" height="50vh" display="flex" flexDirection="column" alignItems="center">
      <Box width="80%" maxWidth="1200px" padding="20px">
        {!pdfMode && (
          <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
            <CreatePost />
            <Button colorScheme="blue" onClick={generateReport} marginRight="10px">
              Generate Report
            </Button>
          </Flex>
        )}
        <Table variant="striped" colorScheme="brand" size="sm">
          <TableCaption>All post</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric bg="blue.500" color="white">Text</Th>
              <Th isNumeric bg="blue.500" color="white">Image</Th>
              <Th isNumeric bg="blue.500" color="white">Likes Count</Th>
              <Th isNumeric bg="blue.500" color="white">Replies Count</Th>
              <Th isNumeric bg="blue.500" color="white">Created At</Th>
              <Th isNumeric bg="blue.500" color="white">Action</Th>
            </Tr>
          </Thead>
          <Tbody id="pdf-content">
            {!fetchingPosts && posts.length === 0 && (
              <Tr>
                <Td colSpan="6">User has no posts.</Td>
              </Tr>
            )}
            {fetchingPosts && (
              <Tr>
                <Td colSpan="6">
                  <Flex justifyContent="center" my={12}>
                    <Spinner size="xl" />
                  </Flex>
                </Td>
              </Tr>
            )}
            {!fetchingPosts &&
              posts.map((post) => (
                <ChartPost key={post._id} post={post} postedBy={post.postedBy} />
              ))}
          </Tbody>
        </Table>
        {pdfMode && (
          <Box>
            {/* Render PDF mode content here */}
            <p>Downloading PDF...</p>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostChartPage;
