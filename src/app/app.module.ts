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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    FooterComponent,
    TopCategoryComponent,
    TopproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
