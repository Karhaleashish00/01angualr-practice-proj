import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

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
