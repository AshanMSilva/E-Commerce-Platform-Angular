import { Varient } from './varient';

export class Product {
    _id: string;
    brand: string;
    name: string;
    image: string;
    varients:Varient[];
    sales: number;
    topProduct: boolean;

}