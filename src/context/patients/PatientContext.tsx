import { createContext, Dispatch, SetStateAction } from "react";
import { IPatient } from "../../interfaces";

interface ContextProps {
  patients: IPatient[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPatients: React.Dispatch<React.SetStateAction<IPatient[]>>;
  getAllPatients: () => Promise<void>;

  addPatient: (patient: IPatient) => Promise<{
    hasError?: boolean;
    message?: string;
  }>;

  updatePatient: (patient: IPatient) => Promise<{
    hasError: boolean;
    message?: string;
  }>;

  getPatient: (id: string) => Promise<{
    patient?: IPatient | undefined;
    hasError: boolean;
    message?: string | undefined;
  }>;

  deletePatient: (id: string) => Promise<
    | {
        hasError: boolean;
        message: string;
      }
    | undefined
  >;
}

export const PatientContext = createContext({} as ContextProps);
