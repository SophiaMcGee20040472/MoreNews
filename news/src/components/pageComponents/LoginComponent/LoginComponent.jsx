import {
  Box,
  Button,
  Input,
  Text,
  Stack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

const LoginComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (value) => {
    if (!value.includes("@") || !value.includes(".")) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = validateEmail(email);
    let validPassword = true;
    let validConfirm = true;

    if (!password) {
      setPasswordError("Password is required");
      validPassword = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      validPassword = false;
    } else {
      setPasswordError("");
    }

    if (!isLogin) {
      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm your password");
        validConfirm = false;
      } else if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords do not match");
        validConfirm = false;
      } else {
        setConfirmPasswordError("");
      }
    }

    if (validEmail && validPassword && validConfirm) {
      alert(
        isLogin
          ? "Logged in successfully!(This is just temp if I have time will create modal)"
          : "Account created! (This is just temp if I have time will create modal)"
      );
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      bg="transparent"
      mt="auto"
      px={4}
    >
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
          mb={6}
          textAlign="center"
          color="gray.700"
        >
          {isLogin ? "Sign In" : "Create Account"}
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!emailError}>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                borderColor="orange.200"
                bg="gray.50"
                _focus={{
                  borderColor: "#ff7600",
                  boxShadow: "0 0 0 1px #ff7600",
                }}
              />
              {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!passwordError}>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                borderColor="orange.200"
                bg="gray.50"
                _focus={{
                  borderColor: "#ff7600",
                  boxShadow: "0 0 0 1px #ff7600",
                }}
              />
              {passwordError && (
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              )}
            </FormControl>
            {!isLogin && (
              <FormControl isInvalid={!!confirmPasswordError}>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) setConfirmPasswordError("");
                  }}
                  borderColor="orange.200"
                  bg="gray.50"
                  _focus={{
                    borderColor: "#ff7600",
                    boxShadow: "0 0 0 1px #ff7600",
                  }}
                />
                {confirmPasswordError && (
                  <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
                )}
              </FormControl>
            )}
            <Button colorScheme="orange" width="100%" type="submit">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
            <Button
              variant="outline"
              borderColor="#ff7600"
              color="#ff7600"
              onClick={() => {
                setIsLogin(!isLogin);
                setEmailError("");
                setPasswordError("");
                setConfirmPasswordError("");
              }}
              width="100%"
            >
              {isLogin ? "Need Account? Sign Up" : "My Account? Sign In"}
            </Button>
            {isLogin && (
              <Button variant="ghost" color="#ff7600" size="sm" width="100%">
                Forgot Password?
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginComponent;
