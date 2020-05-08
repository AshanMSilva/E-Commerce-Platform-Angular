import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopCategoryComponent } from './pages/top-category/top-category.component';
import { TopproductComponent } from './pages/topproduct/topproduct.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { AccountComponent } from './pages/account/account.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { CategoryService } from './services/categoryService/category.service';
import { AuthGuardService } from './services/authGuradService/auth-guard.service';
import { AuthService } from './services/authService/auth.service';
import { ProcessHttpmsgService } from './services/processHttpmsgService/process-httpmsg.service';
import { Customer } from './shared/customer';
import { CustomerService } from './services/customerService/customer.service';
import { OrderService } from './services/orderService/order.service';
import { ProductService } from './services/productService/product.service';
import { VarientService } from './services/varientService/varient.service';
import { baseURL } from './shared/baseurl';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    FooterComponent,
    TopCategoryComponent,
    TopproductComponent,
    CartComponent,
    ProductComponent,
    AccountComponent,
    WishlistComponent,
    OrdersComponent,
    OrderdetailsComponent,
    CategoryProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoryService,
    AuthGuardService,
    AuthService,
    ProcessHttpmsgService,
    CustomerService,
    OrderService,
    ProductService,
    VarientService,
    {provide: 'baseURL', useValue: baseURL},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
