
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CircularLoading } from "../../../components/ui/CircularLoading";
import { FullScreenLoading } from "../../../components/ui/FullScreenLoading";
import { useAuth } from "../../../hooks/useAuth";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string | undefined;
  web: string | undefined;
  roles: string;
};

const NewUser = () => {
  const [edited, setEdited] = useState(false);
  const [loadingEdited, setLoadingEdited] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  // const { addUserByAdmin, updateUserByAdmin, getUserByAdmin, loading } =
  //   useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      web: "",
    },
  });

  

  // useEffect(() => {
  //   (async () => {
  //     if (!params.id) return;
  //     setLoadingEdited(true);
  //     const { user } = await getUserByAdmin(params.id!);
  //     setLoadingEdited(false);
  //     if (user?.name) {
  //       setValue("name", user!.name);
  //       setValue("email", user!.email);
  //       setValue("phone", user!.phone);
  //       setValue("web", user!.web);
  //       //setValue("roles", user!.roles);
  //     }
  //     setEdited(true);
  //   })();
  // }, []);

  // const onAddOrEditSupplier = async ({
  //   name,
  //   email,
  //   phone,
  //   web,
  //   password,
  // }: FormData) => {
  //   if (params.id) {
  //     const { hasError, message } = await updateUserByAdmin({
  //       id: params.id,
  //       name,
  //       email,
  //       phone,
  //       password,
  //       web,
  //     });

  //     if (!hasError) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: message,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       navigate("/admin/user-list");
  //       return;
  //     }

  //     if (hasError) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "warning",
  //         title: message,
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //       return;
  //     }
  //   } else {
  //     const { hasError, message } = await addUserByAdmin({
  //       name,
  //       email,
  //       phone,
  //       web,
  //     });
  //     if (!hasError) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: message,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       navigate("/admin/user-list");
  //       return;
  //     }

  //     if (hasError) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "warning",
  //         title: message,
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //       return;
  //     }
  //   }
  // };


  if (loadingEdited)
  return (
    <>
      <FullScreenLoading />
    </>
  );


  return (
    <Box
      sx={{
        width: { xs: 350, sm: 600 },
        padding: "10px 20px",
        marginTop: { xs: 2 },
      }}>
      <form  noValidate>
        <Grid container spacing={2} className="fadeIn">
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" textAlign={"center"}>
              {edited ? "Editando usuario" : "Agregando usuario"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre usuario"
              variant="outlined"
              fullWidth
              {...register("name", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              {...register("email", {
                required: "Este campo es requerido",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Telefono"
              variant="outlined"
              type="phone"
              fullWidth
              {...register("phone", {
                required: "Este campo es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Web"
              variant="outlined"
              fullWidth
              {...register("web", {
                required: "Este campo es requerido",
              })}
              error={!!errors.web}
              helperText={errors.web?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password", {
                required: "Este campo es requerido"
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Roles"
              variant="outlined"
              fullWidth
              {...register("roles", {
                required: "Este campo es requerido",
              })}
              error={!!errors.roles}
              helperText={errors.roles?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth>
                Crear usuario
              {/* {loading ? (
                <CircularLoading />
              ) : edited ? (
                "Editar usuario"
              ) : (
                "Crear usuario"
              )} */}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default NewUser;



















































































