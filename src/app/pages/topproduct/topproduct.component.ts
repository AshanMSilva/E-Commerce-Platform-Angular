import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService/product.service';
import { Product } from 'src/app/shared/product';
import { baseURL } from 'src/app/shared/baseurl';

@Component({
  selector: 'app-topproduct',
  templateUrl: './topproduct.component.html',
  styleUrls: ['./topproduct.component.css']
})
export class TopproductComponent implements OnInit {
  topProducts: Product[];
  topProductsErr:any;
  productImageUrl:String = baseURL+'images/products/';
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products=>{
      if(products){
        products.sort((a, b) => a.sales < b.sales ? -1 : a.sales > b.sales ? 1 : 0)
        products.reverse();
        this.topProducts=products.slice(0,8);
      }
    })
  }

}
