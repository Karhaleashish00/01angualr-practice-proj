import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './../../http.service';
import { registerData } from 'src/model/from-data.component';
import { HttpHeaders } from '@angular/common/http';

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
  msg:string=''

  constructor(private router:Router,private httpService:HttpService){}

  goToHome(){
    this.router.navigateByUrl('/')
  }

  loginUser(){
    this.httpService.getCustomerRegisters(this.data).subscribe((res:any)=>{
      this.isvalidUser = res.isvalidUser
      this.router.navigateByUrl('/customerProfile')
    },
    (error:any)=>{
      if(error === 400){
        this.isvalidUser = false
      }
    }
  );
  }
}
