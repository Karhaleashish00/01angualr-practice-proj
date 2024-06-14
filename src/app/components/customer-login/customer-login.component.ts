import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { registerData } from 'src/model/from-data.component';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent {
  data : {
    'email':string,
    'password':string
  }={email:'',password:''};
  isvalidUser:boolean = false
  isvisible:boolean = false
  msg:string=''

  constructor(private router:Router,private httpService:HttpService){}

  goToHome(){
    this.router.navigateByUrl('/')
  }
  togglechange(){
    this.isvisible = !this.isvisible
  }

  gotoshoplogin(){
    this.router.navigateByUrl('/shopLogin')
  }

  loginUser(){
    this.httpService.getCustomerRegisters(this.data).subscribe((res:any)=>{
      this.isvalidUser = res.validUser
      localStorage.setItem('token', res.token);
      console.log("token : ", localStorage.getItem('token'));
      if(this.isvalidUser){
        this.router.navigateByUrl('/customerProfile')
      }
    },
    (error:any)=>{
      if(error === 400){
        this.isvalidUser = false
      }
    }
  );
  }
}
