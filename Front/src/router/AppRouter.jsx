import { Route, Routes } from "react-router-dom";
//import Layout from "../components/Layout/Layout";
import { menuRouter } from "./menuRouter";
import Layout from "../components/Layout/Layout";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {menuRouter.map((route) => {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={<route.Element />}
            />
          );
        })}
      </Route>
    </Routes>
  );
};

export default AppRouter;