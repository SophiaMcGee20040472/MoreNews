import {
  Box,
  Button,
  Input,
  Text,
  Stack,
  FormControl,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const SubmitComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!email.includes("@") || !email.includes("."))
      newErrors.email = "Please enter a valid email";
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSuccess("Message sent! We will get back to you ASAP.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Box
      bg="transparent"
      p={{ base: 6, md: 8 }}
      borderRadius="lg"
      boxShadow="sm"
      border="2px solid"
      borderColor="orange.300"
      w={{ base: "90%", sm: "380px", md: "450px", lg: "550px" }}
      mx="auto"
      mt={{ base: "50px", sm: "380px", md: 10,}}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="semibold"
        mb={8}
        color="gray.700"
        textAlign="center"
      >
        Submit News
      </Text>
      {success && (
        <Text color="green.600" mb={4} fontWeight="medium">
          {success}
        </Text>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              bg="gray.50"
              borderColor="orange.200"
              _focus={{
                borderColor: "#ff7600",
                boxShadow: "0 0 0 1px #ff7600",
              }}
            />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="Your Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              bg="gray.50"
              borderColor="orange.200"
              _focus={{
                borderColor: "#ff7600",
                boxShadow: "0 0 0 1px #ff7600",
              }}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.subject}>
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (errors.subject)
                  setErrors((prev) => ({ ...prev, subject: "" }));
              }}
              bg="gray.50"
              borderColor="orange.200"
              _focus={{
                borderColor: "#ff7600",
                boxShadow: "0 0 0 1px #ff7600",
              }}
            />
            {errors.subject && (
              <FormErrorMessage>{errors.subject}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.message}>
            <Textarea
              placeholder="Enter News Details Here..."
              value={message}
              mb={4}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message)
                  setErrors((prev) => ({ ...prev, message: "" }));
              }}
              rows={5}
              bg="gray.50"
              borderColor="orange.200"
              _focus={{
                borderColor: "#ff7600",
                boxShadow: "0 0 0 1px #ff7600",
              }}
            />
            {errors.message && (
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button colorScheme="orange" width="100%" type="submit">
            Send Message
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitComponent;