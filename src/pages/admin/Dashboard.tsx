import { useEffect } from "react";
import {
  CreditCardOutlined,
  CategoryOutlined,
  CancelPresentationOutlined,
  ProductionQuantityLimitsOutlined,
  AccessTimeOutlined,
  Home,
  FamilyRestroom,
  PeopleAlt,
  ShoppingCart,
  ShoppingCartOutlined,
  FamilyRestroomOutlined,
  AttachMoneyOutlined,
  PeopleAltOutlined,
  PointOfSaleOutlined,
  AddchartOutlined,
} from "@mui/icons-material";
import { Grid } from "@mui/material";

import { SummaryTile } from "../../components/admin";

import { useAuth } from "../../hooks/useAuth";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";
import { format } from "../../utils/currency";
import axiosClient from "../../config/axios";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  // const { checkAuth, setLoading, loading, setDashboardData, dashboardData } =
  //   useAuth();

  // useEffect(() => {
  //   const getDashboardData = async () => {
  //     setLoading(true);
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setLoading(false);
  //       return;
  //     }

  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     try {
  //       setLoading(true);
  //       const { data } = await axiosClient.get("/auth/dashboard", config);
  //       setDashboardData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         setLoading(false);
  //         Swal.fire({
  //           position: "center",
  //           icon: "warning",
  //           title: error.response?.data.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     }
  //   };

  //   getDashboardData();
  // }, []);

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // if (loading || !dashboardData) {
  //   return (
  //     <>
  //       <FullScreenLoading />
  //     </>
  //   );
  // }

  // const {
  //   numberOfSuppliers,
  //   numberOfCategories,
  //   numberOfProducts,
  //   numberOfCustomers,
  //   numberOfSales,
  //   productsWithNoInventory,
  //   lowInventory,
  // } = dashboardData!;

  return (
    <Grid container spacing={2}>
      <SummaryTile
        title={0}
        subTitle="Ingresos diario"
        icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={0}
        subTitle="Ingresos semanal"
        icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={0}
        subTitle="Ingresos mensual"
        icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={0}
        subTitle="Ingresos annual"
        icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={0}
        subTitle="Patientes totales"
        icon={<PointOfSaleOutlined color="success" sx={{ fontSize: 40 }} />}
      />

      {/* <SummaryTile
        title={0}
        subTitle="Categorias totales"
        icon={<CategoryOutlined color="success" sx={{ fontSize: 40 }} />}
      /> */}

      <SummaryTile
        title={0}
        subTitle="Proveedores totales"
        icon={<PeopleAltOutlined color="success" sx={{ fontSize: 40 }} />}
      />

      {/* <SummaryTile
        title={0}
        subTitle="Clientes totales"
        icon={<FamilyRestroomOutlined color="success" sx={{ fontSize: 40 }} />}
      /> */}

      {/* <SummaryTile
        title={0}
        subTitle="Productos totales"
        icon={<ShoppingCartOutlined color="success" sx={{ fontSize: 40 }} />}
      /> */}

      {/* <SummaryTile
        title={10}
        subTitle="Productos mas vendidos"
        icon={<AddchartOutlined color="success" sx={{ fontSize: 40 }} />}
      /> */}

      {/* <SummaryTile
        title={0}
        subTitle="Sin existencias"
        icon={
          <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
        }
      /> */}

      {/* <SummaryTile
        title={0}
        subTitle="Bajo inventario"
        icon={
          <ProductionQuantityLimitsOutlined
            color="warning"
            sx={{ fontSize: 40 }}
          />
        }
      /> */}
    </Grid>
  );
};

export default Dashboard;
