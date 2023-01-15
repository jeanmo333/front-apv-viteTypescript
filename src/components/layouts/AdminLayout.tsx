import { Box } from "@mui/material";
import { SideMenu } from "../ui/SideMenu";
import { Navbar } from "../ui/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FullScreenLoading } from "../ui/FullScreenLoading";

export const AdminLayout = () => {
   const { auth, loading } = useAuth();
   const token = localStorage.getItem("token");

  if (loading && !token)
    return (
      <>
        <FullScreenLoading />
      </>
    );

  return (
    <>
      <SideMenu />

      <nav>
        <Navbar />
      </nav>

      {auth?._id || token ? (
        <Box
          sx={{
            margin: "30px auto",
            marginTop: "80px",
            maxWidth: { xs: "100%", md: "80%" },
            padding: "0px 30px",
          }}>
          <Box
            className="fadeIn"
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Outlet />
          </Box>
        </Box>
       ) : (
         <Navigate to="/" />
       )} 
    </>
  );
};
