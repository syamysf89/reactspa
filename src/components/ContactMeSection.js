import React, {useEffect, useState} from "react";
import { useFormik, Formik, Field, setNestedObjectValues } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();
  const [actions, setActions] = useState(null);

  useEffect(() => {
    if(response!=null && response.type != undefined){
      onOpen(response.type, response.message); 
      if (response.type == "success"){
        actions.resetForm();
      }
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      firstName: 'name',
      email: 'sample@example.com',
      comment: 'Use the comment section for atleast 25 charachters',
    },
    onSubmit: (values, actions)=>{     
      submit("", values); 
      setActions(actions);
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(),
      email: Yup.string().email("Invalid email address").required(),
      comment: Yup.string().min(25, "Must be at least 25 characters").required(),
    }),
  });
  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          {/* <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
          {({ errors, touched }) => ( */}
            <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!formik.errors.firstName && formik.touched.firstName}>
                  <FormLabel htmlFor="firstName">Name</FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    {...formik.getFieldProps("firstName")}
                  />
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                  <Select id="type" name="type" style={{color: 'white'}}>
                    <option style={{color: 'black'}} value="hireMe">Freelance project proposal</option>
                    <option style={{color: 'black'}} value="openSource">
                      Open source consultancy session
                    </option>
                    <option style={{color: 'black'}} value="other">Other</option>
                  </Select>
                </FormControl>
                <FormControl isInvalid={!!formik.errors.comment && formik.touched.comment}>
                  <FormLabel htmlFor="comment">Your message</FormLabel>
                  <Textarea
                    id="comment"
                    name="comment"
                    {...formik.getFieldProps("comment")}
                    // value={formik.values.comment}
                    // onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full">
                  {(!isLoading)?"Submit":(<FontAwesomeIcon icon={faSpinner} className="fa-spin" />)}
                </Button>
              </VStack>
            </form>       
          {/* )}
          </Formik> */}
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;