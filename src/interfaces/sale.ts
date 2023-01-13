// import { ICustomer } from "./customer";
// import { IDetailSaleCart } from "./detailSaleCart";
import { IUser } from "./user";

export interface ISale {

    id? : string;
    discount: number;
    total: number;
    user?: IUser | string;
    numberOfItems: number;
    // customer?: ICustomer;
    // details?: IDetailSaleCart;

    createdAt?: string;
    updatedAt?: string;
}
