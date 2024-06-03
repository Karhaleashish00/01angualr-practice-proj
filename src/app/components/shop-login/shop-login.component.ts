import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-shop-login',
  templateUrl: './shop-login.component.html',
  styleUrls: ['./shop-login.component.css']
})
export class ShopLoginComponent {
  data : {
    'email':string,
    'password':string
  }={email:'',password:''};
  isvalidUser:boolean = false

  constructor(private router:Router,private httpService:HttpService){}

  goToHome(){
    this.router.navigateByUrl('/')
  }

  gotocustomerlogin(){
    this.router.navigateByUrl('/login')
  }

  loginUser(){
    this.httpService.getShopRegisters(this.data).subscribe((res:any)=>{
      this.isvalidUser = res.validUser
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
