import { useStore } from "@/components/contexts/store";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
   const role = useStore(
    (state) => state.role
  );

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
