import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react"; 
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import packagesAtom from "../atoms/packagesAtom";

const UDPackage = ({ selectedPackage, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const [packages, setPackages] = useRecoilState(packagesAtom);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy);
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setUser(null);
            }
        };

        getUser();
    }, [postedBy, showToast]);

    const handleDeletePackage = async (e) => {
        try {
            e.preventDefault();
            if (!window.confirm("Are you sure you want to delete this post?")) return;

            const res = await fetch(`/api/packages/${selectedPackage._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Package deleted", "success");
            setProducts(packages.filter((p) => p._id !== selectedPackage._id));
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!user) return null;

   
   
    

    return (
        <Tr>
        <Td><Link to={`/userDashBoard/${user.username}/udPackage/${selectedPackage._id}`}>{selectedPackage.packageName} </Link></Td>
        <Td>{selectedPackage.packageDescription}</Td>
        <Td>{selectedPackage.packagePrice}</Td>
        <Td>{selectedPackage.packageOfferPrice}</Td>
        <Td>
          {selectedPackage.packageImg && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
              <Image src={selectedPackage.packageImg} w={"100px"} />
            </Box>
          )}
        </Td>
        <Td>{selectedPackage.likes?.length}</Td>
        <Td>{selectedPackage.reviews?.length}</Td>
        <Td>{selectedPackage.buyers?.length}</Td>

        <Td>{formatDistanceToNow(new Date(selectedPackage.createdAt))} ago</Td>
        <Td>
          {currentUser?._id === postedBy && (
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              aria-label="Delete Post"
              onClick={handleDeletePackage}
            />
          )}
        </Td>
      </Tr>
    );
};

export default UDPackage;