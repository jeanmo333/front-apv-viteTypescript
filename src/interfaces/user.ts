export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  roles?: string;
  phone?: string;
  web?: string;
  isActive?: boolean;
  token?: string;

  createdAt?: string;
  updatedAt?: string;
}
