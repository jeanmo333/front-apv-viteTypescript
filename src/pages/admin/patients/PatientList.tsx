import { useNavigate } from "react-router-dom";
import { AddOutlined, Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { useEffect } from "react";
import { FullScreenLoading } from "../../../components/ui/FullScreenLoading";
import { CircularLoading } from "../../../components/ui/CircularLoading";
import { usePatients } from "../../../hooks/usePatients";
import { formatDate } from "../../../utils/date";

const PatientList = () => {
  const navigate = useNavigate();

  const { getAllPatients, loading, patients, deletePatient } =
    usePatients();

  const navigateTo = (url: string) => {
    navigate(url);
  };

  


  useEffect(() => {
    getAllPatients();
  }, []);


  const rows = patients!.map((patient) => ({
    id: patient._id,
    name: patient.name,
    email: patient.email,
    owner: patient.owner,
    date: formatDate(patient.date!),
    symptoms: patient.symptoms
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "owner", headerName: "Propietario", width: 200 },
    { field: "symptoms", headerName: "Sintomas", width: 200 },
    { field: "date", headerName: "Fecha", width: 200 },
    {
      field: "check",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <>
            <IconButton
              sx={{ marginRight: 2, color: "white" }}
              onClick={() => navigateTo(`/admin/new-patient/${row.id}`)}
             >
              <Edit sx={{ color: "#FF5733", fontSize: 30 }} />
            </IconButton>

            {loading ? <CircularLoading/> : (
                 <IconButton
                 sx={{ marginRight: 2 }}
                onClick={() => deletePatient(row.id)}
                 >
                 <Delete sx={{ fontSize: 30, color: "#C70039" }} />
               </IconButton>
            )}

        
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
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          onClick={() => navigateTo("/admin/new-patient")}>
          Crear Patiente
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

export default PatientList;
