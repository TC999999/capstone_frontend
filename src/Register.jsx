import Signup from "./SignUp.jsx";
import Login from "./LogIn.jsx";
import { useState, useEffect } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="register-forms">
      <Login isLoading={isLoading} setIsLoading={setIsLoading} />
      <Signup isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
};

export default Register;
