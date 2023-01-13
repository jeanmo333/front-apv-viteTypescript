import { FC, useEffect, useState } from "react";
import { AuthContext } from "./";
import { IDashboardData, IUser } from "../../interfaces";
import axiosClient from "../../config/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [auth, setAuth] = useState<IUser>();
  const [dashboardData, setDashboardData] = useState<IDashboardData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axiosClient("/users/profile", config);
      setAuth(data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
    }
    setLoading(false);
  };



 



 

  // const getUsers = async () => {
  //   setLoading(true);
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setLoading(false);
  //     return;
  //   }

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   try {
  //     const { data } = await axiosClient.get("/auth/admin/users", config);
  //     setUsers(data);
  //     setLoading(false);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "warning",
  //         title: error.response?.data.message,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   }
  // };

  // const getUserByAdmin = async (
  //   id: string
  // ): Promise<{ user?: IUser; hasError: boolean; message?: string }> => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setLoading(false);
  //       return {
  //         hasError: true,
  //         message: "hubo un error",
  //       };
  //     }

  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     const { data } = await axiosClient.get(`/auth/admin/users/${id}`, config);
  //     const { user } = data;

  //     return {
  //       hasError: false,
  //       message: data.message,
  //       user,
  //     };
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       return {
  //         hasError: true,
  //         message: error.response?.data.message,
  //       };
  //     }

  //     return {
  //       hasError: true,
  //       message: "hubo un error",
  //     };
  //   }
  // };

  const addUserByAdmin = async (
    user: IUser
  ): Promise<{
    hasError?: boolean;
    message?: string;
  }> => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return {
        hasError: true,
        message: "hubo un error",
      };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const { data } = await axiosClient.post(
        "/auth/admin/register-user",
        user,
        config
      );
      const { userSave } = data;
      setUsers([userSave, ...users]);
      setLoading(false);
      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };

  const updateUserByAdmin = async (
    user: IUser
  ): Promise<{ hasError: boolean; message?: string }> => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return {
        hasError: true,
        message: "hubo un error",
      };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const { data } = await axiosClient.patch(
        `/auth/admin/update-user/${user.id}`,
        user,
        config
      );
      const { userUpdate } = data;
      const usersEdit = users.map((userState) =>
        userState.id === userUpdate.id ? userUpdate : userState
      );
      setUsers(usersEdit);

      setLoading(false);

      return {
        hasError: false,
        message: data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };

  const deleteUserByAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return {
        hasError: true,
        message: "hubo un error",
      };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      Swal.fire({
        title: "Estas Seguro?",
        text: "Esta accion no puede dehacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosClient.delete(`/auth/admin/update-user/${id}`, config);
          const usersUpdate = users.filter((userState) => userState.id !== id);
          setUsers(usersUpdate);
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    setAuth(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        users,
        loading,
        dashboardData,
        // Methods
      //  getUsers,
        setLoading,
        checkAuth,
        setUsers,
        setAuth,
        logout,
        setDashboardData,
        addUserByAdmin,
        updateUserByAdmin,
        deleteUserByAdmin,
      //  getUserByAdmin,
       // getDashboardData
      }}>
      {children}
    </AuthContext.Provider>
  );
};
