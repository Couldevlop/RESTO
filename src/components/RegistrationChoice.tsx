/*import React from "react";
import { useNavigate } from "react-router-dom";

const RegistrationChoice = () => {
  const navigate = useNavigate();

  const handleRegistrationType = (type: "client" | "personnel") => {
    navigate(type === "client" ? "/registration" : "/admin-login");
  };

  return (
    <div>
      <button onClick={() => handleRegistrationType("client")}>Client</button>
      <button onClick={() => handleRegistrationType("personnel")}>Personnel</button>
    </div>
  );
};

export default RegistrationChoice;*/

import React from "react";
import { useNavigate } from "react-router-dom";

const RegistrationChoice = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/registration")}>Client</button>
      <button onClick={() => navigate("/admin-login")}>Personnel</button>
    </div>
  );
};

export default RegistrationChoice;



