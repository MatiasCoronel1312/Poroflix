import MiLista from "@/pages/MiLista";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const UserMiLIsta = () => {
  return (
    <ProtectedRoute>
      <MiLista />
    </ProtectedRoute>
  );
};

export default UserMiLIsta;
