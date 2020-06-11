import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/productService/product.service';
import { ActivatedRoute } from '@angular/router';
import { VarientService } from 'src/app/services/varientService/varient.service';
import { Product } from 'src/app/shared/product';
import { baseURL } from 'src/app/shared/baseurl';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: any;
  err:any;
  product: Product;
  productImageUrl:String = baseURL+'images/products/';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private varientService: VarientService
  ) { }

  ngOnInit(): void {
    this.productId =this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe(product=>{
      if(product){
        this.product=product;
      }
    }, err=>{
      if(err){
        console.log(err);
        this.err=err;
      }
    })
  }

}
