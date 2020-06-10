import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { MailService } from 'src/app/services/mailService/mail.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed = true;
  closeResult = '';
  loginForm:FormGroup;
  registerForm: FormGroup;
  randomValue: Number;
  randomCodeForm: FormGroup;
  loggedIn: Boolean;
  user={
    email:'',
    password:''
  }
  randomCodeFormErrors ={
    'code':''
  };
  randomCodeValidationMessages ={
    'code':{
      'required': 'Code is required'
      
    }
  };
  registerFormErrors ={
    'firstName':'',
    'lastName': '',
    'email': '',
    'password':'',
    'rePassword':'',
    'contactOne':'',
    'contactTwo':'',
    'houseNumber':'',
    'firstStreet':'',
    'city':'',
    'state':'',
    'zipCode':''
  }
  registerValidationMessages ={
    'firstName':{
      'required': 'First Name is Required',
      'pattern':'Allowed alphabetic characters only'
    },
    'lastName':{
      'required': 'Last Name is Required',
      'pattern':'Allowed alphabetic characters only'
    },
    'email':{
      'required': 'Email Address is Required',
      'email':'Email Address is not in valid format'
    },
    'password':{
      'required': 'Password is Required',
      'pattern': 'Must contain at least one number and one uppercase and lowercase letter, at least one special character and at least 6 or more characters without spaces'
    },
    'rePassword':{
      'required': 'Re-Password is Required',
      'pattern': 'Must contain at least one number and one uppercase and lowercase letter, at least one special character and at least 6 or more characters without spaces'
    },
    'contactOne':{
      'required': 'Contact Number is Required',
      'pattern': 'Should be 10 digit phone number'
    },
    'contactTwo':{
      'pattern': 'Should be 10 digit phone number'
    },
    'houseNumber':{
      'required': 'House Number is Required',
    },
    'firstStreet':{
      'required': '1st Street is Required',
    },
    'city':{
      'required': '2nd Street/City is Required',
    },
    'state':{
      'required': 'City/State is Required',
    },
    'zipCode':{
      'required': 'Zip Code is Required',
      'pattern': 'Should contain only 5 numbers'
    }

  }

  loginFormErrors ={
    'email':'',
    'password':''
  };
  loginValidationMessages ={
    'email':{
      'required': 'Email Address is required',
      'email':'Emai Address is not in valid format'
    },
    'password':{
      'required': 'password is required'
    }
  };

  constructor(
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private customerService: CustomerService,
      private mailService: MailService,
      private authService: AuthService
    ) {}

  async ngOnInit(): Promise<void> {
    this.createLoginForm();
    this.createRegisterForm();
    this.createRandomCodeForm();
    await this.authService.loadUserCredentials();
    if(this.authService.isLoggedIn() === true){
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }
  }
  open(content, modalSize) {
    this.modalService.open(content, {size:modalSize});
  }

  createLoginForm(){
    this.loginForm =this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });
    this.loginForm.valueChanges.subscribe(data=>this.onValueChanged());
    this.onValueChanged(); //reset form validation messages
  }

  createRegisterForm(){
    this.registerForm =this.formBuilder.group({
      firstName:['',[Validators.required, Validators.pattern]],
      lastName:['',[Validators.required, Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.pattern]],
      rePassword:['',[Validators.required, Validators.pattern]],
      contactOne:['',[Validators.required, Validators.pattern]],
      contactTwo:['',[ Validators.pattern]],
      houseNumber:['',[Validators.required]],
      firstStreet:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      zipCode:['',[Validators.required, Validators.pattern]]
    });
    this.registerForm.valueChanges.subscribe(data=>this.onRegisterFormValueChanged());
    this.onRegisterFormValueChanged(); //reset form validation messages
  }

  onValueChanged(){
    if(!this.loginForm){
      return;
    }
    const form =this.loginForm;
    for(const field in this.loginFormErrors){
      if(this.loginFormErrors.hasOwnProperty(field)){
        //clear previous error messsage(if any)
        this.loginFormErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages =this.loginValidationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.loginFormErrors[field]+=messages[key] +' ';
            }
          }
        }
      }
    }
  }
  onRegisterFormValueChanged(){
    if(!this.registerForm){
      return;
    }
    const form =this.registerForm;
    for(const field in this.registerFormErrors){
      if(this.registerFormErrors.hasOwnProperty(field)){
        //clear previous error messsage(if any)
        this.registerFormErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages =this.registerValidationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.registerFormErrors[field]+=messages[key] +' ';
            }
          }
        }
      }
    }
  }

  // getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  onLoginSubmit(loginContent, loginModalSize){
    this.user.email = this.loginForm.value['email'];
    this.user.password = this.loginForm.value['password'];
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          alert('Succesfully logged In');
          this.loggedIn = true;
          // this.zone.run(() => this.router.navigate(['home', {alert: 'Succesfully logged In'}]));
        } else {
          alert(res.status);
          this.open(loginContent, loginModalSize);
        }
      },
      err => {
        if(err){
          alert(err);
          this.open(loginContent, loginModalSize);
        }
        
      });
  }
  onRegisterSubmit(signupContent, signupModalSize, confirmCodeContent, confirmCodeModalSize){
    let password = this.registerForm.value['password'];
    let rePassword = this.registerForm.value['rePassword'];
    // console.log(password);
    // console.log(rePassword);
    
    if(password === rePassword){
      this.customerService.getUserByEmail(this.registerForm.value['email']).subscribe(users=>{
        if(users){
          if(users.length>0){
            alert('This Email Address is already exists. Please Enter a different Email Address..');
            this.open(signupContent, signupModalSize);
          }
          else{
            this.randomValue = this.getRandomIntInclusive(100000, 999999);
            let body ={
              email: this.registerForm.value['email'],
              subject:'Email Verification',
              text:`Verification Code: ${this.randomValue}. Please use the given code to verify your email address`
            }
            this.mailService.sendMail(body).subscribe(res=>{
              if(res){
                if(res===true){
                  alert('Verification Code is sent to Your Email Address. Please Check your Mail Box..');
                  this.open(confirmCodeContent, confirmCodeModalSize);
                }
                else{
                  alert('Something went wrong. Please try again later.');
                  this.open(signupContent, signupModalSize);
                }
              }
            })
          }
        }
      }, err=>{
        if(err){
          alert(err);
          this.open(signupContent, signupModalSize);
        }
      })
      
      
      

    }
    else{
      alert('Password and Confirm Password should be same..');
      this.open(signupContent, signupModalSize);
    }
    
  }
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
  reSendCode(randomCodeContent, randModalSize){
    this.randomValue = this.getRandomIntInclusive(100000, 999999);
        let body ={
          email: this.registerForm.value['email'],
          subject:'Email Verification',
          text:`Verification Code: ${this.randomValue}. Please use the given code to verify your email address`
        }
        this.mailService.sendMail(body).subscribe(res=>{
          if(res){
            if(res===true){
              alert('Verification Code is sent to Your Email Address. Please Check your Mail Box..');
              this.randomCodeForm.reset();
              this.open(randomCodeContent, randModalSize);
            }
            else{
              alert('Something went wrong. Please try again later.');
              this.randomCodeForm.reset();
              this.open(randomCodeContent, randModalSize);
            }
          }
        })
  }
  createRandomCodeForm(){
    this.randomCodeForm =this.formBuilder.group({
      code:['',[Validators.required]]
      
      
    });
    this.randomCodeForm.valueChanges.subscribe(data=>this.onChangeRandomCodeValueChanged());
    this.onChangeRandomCodeValueChanged(); //reset form validation messages
  }

  onChangeRandomCodeValueChanged(){
    if(!this.randomCodeForm){
      return;
    }
    const form =this.randomCodeForm;
    for(const field in this.randomCodeFormErrors){
      if(this.randomCodeFormErrors.hasOwnProperty(field)){
        //clear previous error messsage(if any)
        this.randomCodeFormErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages =this.randomCodeValidationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.randomCodeFormErrors[field]+=messages[key] +' ';
            }
          }
        }
      }
    }
  }
  onRandomCodeSubmit(signupContent, signupModalSize, loginContent, loginModalSize,  randomCodeContent, randModalSize){
    let rand = this.randomCodeForm.value['code'];
    if(this.randomValue.toString()=== rand){
      let contactOne = this.registerForm.value['contactOne'];
      let contactTwo = this.registerForm.value['contactTwo'];
      if(contactTwo===""){
        let body={
          firstName: this.registerForm.value['firstName'],
          lastName: this.registerForm.value['lastName'],
          email: this.registerForm.value['email'],
          password: this.registerForm.value['password'],
          addresses:[
            {
              houseNumber: this.registerForm.value['houseNumber'],
              firstStreet: this.registerForm.value['firstStreet'],
              city: this.registerForm.value['city'],
              state: this.registerForm.value['state'],
              zipCode: this.registerForm.value['zipCode']
            }
          ],
          contactNumbers:[
            contactOne
          ]
          
          
          
        }
        this.customerService.addNewUser(body).subscribe(user=>{
          if(user){
            alert('You have successfully registerd to our E commerce Platform. Please Log with your email Address and password to cotinue.');
            this.open(loginContent, loginModalSize);
          }
        }, err=>{
          if(err){
            alert(err);
            this.open(signupContent, signupModalSize);
          }
        })
      }
      else{
        let body={
          firstName: this.registerForm.value['firstName'],
          lastName: this.registerForm.value['lastName'],
          email: this.registerForm.value['email'],
          password: this.registerForm.value['password'],
          addresses:[
            {
              houseNumber: this.registerForm.value['houseNumber'],
              firstStreet: this.registerForm.value['firstStreet'],
              city: this.registerForm.value['city'],
              state: this.registerForm.value['state'],
              zipCode: this.registerForm.value['zipCode']
            }
          ],
          contactNumbers:[
            contactOne,
            contactTwo
          ]
          
        }
        this.customerService.addNewUser(body).subscribe(user=>{
          if(user){
            alert('You have successfully registerd to our E commerce Platform. Please Log with your email Address and password to cotinue.');
            this.open(loginContent, loginModalSize);
          }
        }, err=>{
          if(err){
            alert(err);
            this.open(signupContent, signupModalSize);
          }
        })
      }
    }
    else{
      alert('Your Entered Code is Incorrect. Please enter correct code or Click resend to send Code again..');
      this.randomCodeForm.reset();
      this.open(randomCodeContent, randModalSize);
    }

  }
  logOut(){
    this.authService.logOut();
    this.loggedIn = this.authService.isLoggedIn();
    
  }

}
