import React from "react";
import { Login as LoginComponent } from "../components/index";
function Login() {
  return (
    <div className="py-8">
      {console.log("inside login page")}
      <LoginComponent />
    </div>
  );
}

export default Login;
