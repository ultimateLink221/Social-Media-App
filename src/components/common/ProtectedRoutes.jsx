import React from "react";
import { Outlet } from "react-router-dom";
import Redirect from "./Redirect";

function ProtectedRoutes({user}) {
  return (
    user ? <Outlet /> : <Redirect />
  );
}

export default ProtectedRoutes;