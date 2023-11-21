import React from "react";
import { Input, VStack, Button, Box } from "@chakra-ui/react";
import "./pages.css";

function Login() {
  return (
    <div className="login-container">
      <VStack borderColor={"red.400"}>
        <Input size={"md"} width="20rem" placeholder="Enter Email here..." />
        <Input
          type={"password"}
          size={"md"}
          width="20rem"
          placeholder="Enter Password here..."
        />
        <Button type="submit">Login</Button>
      </VStack>
    </div>
  );
}

export default Login;
