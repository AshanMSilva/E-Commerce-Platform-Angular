import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';


const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'cart', component:CartComponent},
  {path: 'product', component: ProductComponent},
  {path:'wishlist', component: WishlistComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
