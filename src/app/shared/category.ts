import { Product } from './product';

export class Category{
    id: string;
    name: string;
    subCategories: Category[];
    products:Product[];
    topCategory: boolean;
}