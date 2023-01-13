import { createContext, Dispatch, SetStateAction } from "react";
import { IDashboardData, IUser } from "../../interfaces";

interface ContextProps {
  users?: IUser[] | undefined;
  auth: IUser | undefined;
  loading: boolean;

  dashboardData: IDashboardData | undefined;

  setLoading: Dispatch<SetStateAction<boolean>>;

  setAuth: React.Dispatch<React.SetStateAction<IUser | undefined>>;

  logout: () => void;

  // getUsers: () => Promise<void>;

  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;

  checkAuth: () => Promise<void>;

  addUserByAdmin: (user: IUser) => Promise<{
    hasError?: boolean;
    message?: string;
  }>;

  updateUserByAdmin: (user: IUser) => Promise<{
    hasError: boolean;
    message?: string;
  }>;

  deleteUserByAdmin: (id: string) => Promise<
    | {
        hasError: boolean;
        message: string;
      }
    | undefined
  >;

  // getUserByAdmin: (id: string) => Promise<{
  //   user?: IUser;
  //   hasError: boolean;
  //   message?: string;
  // }>;


  setDashboardData: React.Dispatch<
    React.SetStateAction<IDashboardData | undefined>
  >;
}

export const AuthContext = createContext({} as ContextProps);
