import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./themes";
import { AuthProvider } from "./context/auth";
import { AdminLayout } from "./components/layouts/AdminLayout";
import { AuthLayout } from "./components/layouts/AuthLayout";
import Dashboard from "./pages/admin/Dashboard";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import NewPassword from "./pages/auth/NewPassword";
import Register from "./pages/auth/register";
import "./styles/globals.css";
import { UiProvider } from "./context/ui";
import Account from "./pages/admin/Account";


import UserList from "./pages/admin/users/UserList";
import NewUser from "./pages/admin/users/NewUser";
import { PatientProvider } from "./context/patients";
import PatientList from "./pages/admin/patients/PatientList";
import NewPatient from "./pages/admin/patients/NewPatient";
import ConfirmAccount from "./pages/auth/ConfirmAccount";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Routes>
                {/* **************************Auth***************************** */}
                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />

                  <Route path="register" element={<Register />} />

                  <Route path="forget-password" element={<ForgetPassword />} />

                  <Route path="new-password/:token" element={<NewPassword />} />

                  <Route
                    path="confirm-account/:token"
                    element={<ConfirmAccount />}
                  />
                </Route>

                {/* *************************Admin*************************** */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="account" element={<Account />} />
                  {/* ********************************************************* */}
                  <Route path="patient-list" element={<PatientList />} />
                  <Route path="new-patient" element={<NewPatient />} />
                  <Route path="new-patient/:id" element={<NewPatient />} />

                  {/* ********************************************************* */}
                  <Route path="user-list" element={<UserList />} />

                  <Route path="new-user" element={<NewUser />} />
                  <Route path="new-user/:id" element={<NewUser />} />
                  {/* ********************************************************* */}
                </Route>
              </Routes>
            </ThemeProvider>
          </UiProvider>
        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
