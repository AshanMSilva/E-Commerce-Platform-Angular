import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';

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
      private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
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
  onLoginSubmit(){
    console.log(this.loginForm.value);
  }
  onRegisterSubmit(){
    console.log(this.registerForm.value);
  }

}
