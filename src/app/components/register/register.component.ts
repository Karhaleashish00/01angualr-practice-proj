import { Component } from '@angular/core';
import { registerData } from 'src/model/from-data.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router) { }

  formdata : registerData = new registerData("","","","");
  ispassvalid:Boolean = true

  registerUser(){
    console.log("From Data : ",this.formdata)
  }
  
  goToHome(){
    this.router.navigateByUrl('/')
  }
}
