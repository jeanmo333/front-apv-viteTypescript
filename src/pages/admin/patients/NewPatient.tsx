import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CircularLoading } from "../../../components/ui/CircularLoading";
import { FullScreenLoading } from "../../../components/ui/FullScreenLoading";
import { usePatients } from "../../../hooks/usePatients";
import { formatDate } from "../../../utils/date";

type FormData = {
  _id?: string;
  name: string;
  owner: string;
  email: string;
  date: string;
  symptoms: string;
};

const NewPatient = () => {
  const [edited, setEdited] = useState(false);
  const [loadingEdited, setLoadingEdited] = useState(false);
  const { addPatient, getPatient, updatePatient, loading } = usePatients();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!params.id) return;
      setLoadingEdited(true);
      const { patient } = await getPatient(params.id!);
      setLoadingEdited(false);
      if (patient?.name) {
        setValue("name", patient!.name);
        setValue("owner", patient!.owner);
        setValue("email", patient!.email);
        setValue("date", formatDate(patient.date!));
        setValue("symptoms", patient!.symptoms);
      }
      setEdited(true);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", owner: "", email: "", date: "", symptoms: "" },
  });

  const onAddOrEditPatient = async ({
    name,
    owner,
    email,
    symptoms,
  }: FormData) => {
    if (params.id) {
      const { hasError, message } = await updatePatient({
        _id: params.id,
        name,
        owner,
        email,
        symptoms,
      });

      if (!hasError) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/patient-list");
        return;
      }

      if (hasError) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: message,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
    } else {
      const { hasError, message } = await addPatient({
        name,
        owner,
        email,
        symptoms,
      });
      if (!hasError) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/patient-list");
        return;
      }

      if (hasError) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: message,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
    }
  };

  

  if (loadingEdited)
    return (
      <>
        <FullScreenLoading />
      </>
    );

  return (
    <Box
      sx={{
        width: 370,
        padding: "10px 20px",
      }}>
      <form onSubmit={handleSubmit(onAddOrEditPatient)} noValidate>
        <Grid container spacing={2} className="fadeIn">
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" textAlign={"center"}>
              {edited ? "Editando Paciente" : "Agregando Paciente"}
              
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Nombre patiente"
              variant="outlined"
              fullWidth
              type="text"
              {...register("name", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Propietario"
              variant="outlined"
              fullWidth
              type="text"
              {...register("owner", {
                required: "Este campo es requerido",
              })}
              error={!!errors.owner}
              helperText={errors.owner?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Este campo es requerido",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <TextField
              label="Fecha"
              variant="outlined"
              fullWidth
              type="date"
              // {...register("date", {
              //   required: "Este campo es requerido",
              // })}
              // error={!!errors.date}
              // helperText={errors.date?.message}
            />
          </Grid> */}

          <Grid item xs={12}>
            <TextField
              label="Sintomas"
              variant="outlined"
              fullWidth
              type="text"
              {...register("symptoms", {
                required: "Este campo es requerido",
              })}
              error={!!errors.symptoms}
              helperText={errors.symptoms?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth>
              {loading ? (
                <CircularLoading />
              ) : edited ? (
                "Editar paciente"
              ) : (
                "Crear Paciente"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default NewPatient;
