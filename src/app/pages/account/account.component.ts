import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';
import { RegisteredCustomer } from 'src/app/shared/registeredCustomer';
import { baseURL } from 'src/app/shared/baseurl';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user:RegisteredCustomer;
  userImageUrl:String = baseURL+'images/profilePictures/';
  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authService.loadUserCredentials();
    if(this.authService.isLoggedIn() === false){
      alert('You should log first.!');
      this.router.navigate(['home']);
    }
    this.authService.getEmail().subscribe(email=>{
      if(email){
        this.customerService.getUserByEmail(email).subscribe(users=>{
          if(users){
            this.user=users[0];
          }
        },err=>{
          if(err){
            console.log(err);
          }
        })
      }
    },err=>{
      if(err){
        console.log(err);
      }
    })
  }

}
