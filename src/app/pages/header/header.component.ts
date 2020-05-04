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
  // @ViewChild('loginform') loginFormDirective;
  formErrors ={
    'email':'',
    'password':''
  };
  validationMessages ={
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
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  createLoginForm(){
    this.loginForm =this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });
    this.loginForm.valueChanges.subscribe(data=>this.onValueChanged());
    this.onValueChanged(); //reset form validation messages
  }

  onValueChanged(){
    if(!this.loginForm){
      return;
    }
    const form =this.loginForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        //clear previous error messsage(if any)
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages =this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key] +' ';
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

}
