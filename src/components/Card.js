import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
  <>
    <VStack style={{backgroundColor: 'white', color: 'black', alignItems: 'flex-start', borderRadius: '10px'}}>
      <Image
            src={imageSrc}
            alt={title}
            style={{borderRadius:'10px'}}

      />
      <Heading style={{padding: "10px"}}>{title}</Heading>
      <Text style={{padding: "10px"}}>{description}</Text>
      <HStack style={{padding: "10px"}}>
        <Text >See More</Text>
        <FontAwesomeIcon icon={faArrowRight} size="1x" />  
      </HStack>  
    </VStack>
  </>

  )
};

export default Card;
