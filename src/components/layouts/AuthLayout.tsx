// import { FC} from 'react';
// import { Box } from '@mui/material';

// interface Props {
//     title: string;
//     children: React.ReactNode;
// }
//import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:mt-6 p-5  md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5 ">
          <Outlet />
        </div>
      </main>

      {/* <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)">
          <Outlet />
        </Box>
      </main> */}
    </>
  );
};
