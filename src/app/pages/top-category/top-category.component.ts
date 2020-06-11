import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { Category } from 'src/app/shared/category';
import { baseURL } from 'src/app/shared/baseurl';

@Component({
  selector: 'app-top-category',
  templateUrl: './top-category.component.html',
  styleUrls: ['./top-category.component.css']
})
export class TopCategoryComponent implements OnInit {
  topCategories: Category[];
  err:any;
  categoryImageUrl:String = baseURL+'images/categories/';
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getTopCategories().subscribe(categories=>{
      if(categories){
        this.topCategories=categories;
      }
    }, err=>{
      if(err){
        this.err=err;
        console.log(err);
      }
    })
  }

}
