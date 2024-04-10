import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';

const ProductCard = () => {
  

  return (
    <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://www.wondermind.com/wp-content/uploads/2023/07/6.png'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Kytefox Publishing Stress Relief Coloring Book</Heading>
      <Text>
      “Lately I’ve started coloring whenever I’m feeling really down and can find the motivation. I take any expectations of drawing something ‘good’ out of it and just color like I’m 6 years old again, which is very freeing. Sometimes I just scribble on a notepad but when I want to get really focused and out of my head I pull out an adult coloring book like this
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
  );
}

export default ProductCard;
