import { Product } from './product';

export class Category{
    _id: string;
    name: string;
    image: string;
    subCategories: Category[];
    products:Product[];
    topCategory: boolean;
}