import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { useParams } from "react-router-dom";

const CreateProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productOfferPrice, setProductOfferPrice] = useState("");
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const imageRef = useRef(null);
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const { username } = useParams();

  const handleCreateProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          productName,
          productDescription,
          productPrice,
          productOfferPrice,
          productImg: imgUrl,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Product created successfully", "success");
      onClose();
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductOfferPrice("");
      setImgUrl("");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
				right={5}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        size={{ base: "sm", sm: "md" }}
      >
        Product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder='Enter product name'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Product Description</FormLabel>
              <Textarea
                placeholder='Enter product description'
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Product Price</FormLabel>
              <Input
                type='number'
                placeholder='Enter product price'
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Product Offer Price</FormLabel>
              <Input
                type='number'
                placeholder='Enter product offer price'
                value={productOfferPrice}
                onChange={(e) => setProductOfferPrice(e.target.value)}
              />
            </FormControl>

            <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

            <BsFillImageFill
              style={{ marginLeft: "5px", cursor: "pointer" }}
              size={16}
              onClick={() => imageRef.current.click()}
            />

            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt='Selected img' />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreateProduct} isLoading={loading}>
              Create Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProduct;
