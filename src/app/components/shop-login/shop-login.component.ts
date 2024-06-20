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
  isvisible : boolean = false
  isvalidUser:boolean = false

  constructor(private router:Router,private httpService:HttpService){}

  goToHome(){
    this.router.navigateByUrl('/')
  }

  togglechange(){
    this.isvisible = !this.isvisible
  }

  gotocustomerlogin(){
    this.router.navigateByUrl('/login')
  }

  loginUser(){
    this.httpService.getShopRegisters(this.data).subscribe((res:any)=>{
      this.isvalidUser = res.validUser
      localStorage.setItem('token', res.token);
      localStorage.setItem('userid',res.id)
      localStorage.setItem('usertype','shop')
      if(this.isvalidUser){
        this.router.navigateByUrl('/shopProfile')
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
