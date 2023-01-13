import { FC, SetStateAction, useState } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import axiosClient from "../../config/axios";
import { PatientContext } from "./PatientContext";
import { IPatient } from "../../interfaces/patient";

interface Props {
  children: React.ReactNode;
}

export const PatientProvider: FC<Props> = ({ children }) => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllPatients = async () => {
    setLoading(true);
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
      const { data } = await axiosClient.get("/patients", config);
      setPatients(data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: error.response?.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const getPatient = async (
    id: string
  ): Promise<{ patient?: IPatient; hasError: boolean; message?: string }> => {
    try {
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

      const { data } = await axiosClient.get(`/patients/${id}`, config);
      const { patient } = data;

      return {
        hasError: false,
        message: data.msg,
        patient
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.msg,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };

  const addPatient = async (
    patient: IPatient
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
      const { data } = await axiosClient.post("/patients", patient, config);
     const{newPatient} =data;
      setPatients([newPatient, ...patients]);
      setLoading(false);
      return {
        hasError: false,
        message: data.msg,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
        return {
          hasError: true,
          message: error.response?.data.msg,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };

  const updatePatient = async (
    patient: IPatient
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
      const { data } = await axiosClient.put(
        `/patients/${patient._id}`,
        patient,
        config
      );

      const { patientUpdate } = data;

      const patientEdited = patients.map((patientState) =>
      patientState._id === patientUpdate._id ? patientUpdate : patientState
      );
      setPatients(patientEdited);

      setLoading(false);

      return {
        hasError: false,
        message: data.msg,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
        return {
          hasError: true,
          message: error.response?.data.msg,
        };
      }

      return {
        hasError: true,
        message: "hubo un error",
      };
    }
  };

  const deletePatient = async (id: string) => {
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
          await axiosClient.delete(`/patients/${id}`, config);
          const patientsUpdate = patients.filter(
            (patientState) => patientState._id !== id
          );
          setPatients(patientsUpdate);
        }
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setLoading(false);
      }
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        loading,
        setPatients,
        getAllPatients,
        setLoading,
        addPatient,
        updatePatient,
        getPatient,
        deletePatient
      }}>
      {children}
    </PatientContext.Provider>
  );
};
