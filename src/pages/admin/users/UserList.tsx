import { AddOutlined, Delete, Edit } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FullScreenLoading } from "../../../components/ui/FullScreenLoading";
import { useAuth } from "../../../hooks/useAuth";

const UserList = () => {
  const navigate = useNavigate();
  const { users, getUsersByAdmin, loading } = useAuth();

  const navigateTo = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    getUsersByAdmin();
  }, []);

  const rows = users!.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    web: user.web,
    roles: user.roles,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "email", headerName: "Correo", width: 200 },
    { field: "phone", headerName: "Telefono", width: 150 },
    { field: "web", headerName: "Web", width: 150 },
    { field: "roles", headerName: "Roles", width: 200 },

    {
      field: "check",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <>
            <>
              <IconButton
                sx={{ marginRight: 2, color: "white" }}
                //onClick={() => navigateTo(`/admin/new-user/${row.id}`)}
              >
                <Edit sx={{ color: "#FF5733", fontSize: 30 }} />
              </IconButton>

              <IconButton
                sx={{ marginRight: 2 }}
                // onClick={() => deleteUserByAdmin(row.id)}
              >
                <Delete sx={{ fontSize: 30, color: "#C70039" }} />
              </IconButton>
            </>
          </>
        );
      },
    },
  ];

  if (loading)
    return (
      <>
        <FullScreenLoading />
      </>
    );

  return (
    <Grid container className="fadeIn">
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          //onClick={() => navigateTo("/admin/new-user")}
        >
          Crear usuario
        </Button>
      </Box>

      <Grid item xs={12} sx={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      </Grid>
    </Grid>
  );
};

export default UserList;
