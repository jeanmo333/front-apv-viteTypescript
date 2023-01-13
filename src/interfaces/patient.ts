import { IUser } from './user';
export interface IPatient {
  _id?: string;
  name: string;
  email: string;
  owner: string;
  date?: string;
  isActive?: boolean;
  symptoms: string;
  user?: IUser | null;

  createdAt?: string;
  updatedAt?: string;
  }
  