import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { registerData } from 'src/model/from-data.component';

@Component({
  selector: 'app-shop-register',
  templateUrl: './shop-register.component.html',
  styleUrls: ['./shop-register.component.css']
})
export class ShopRegisterComponent {
  constructor(
    private router: Router,   
    private httpService: HttpService
  ) { }

  formdata : registerData = new registerData("","","","");
  ispassvalid:Boolean = true
  msg : string=''
  userexist:boolean = false


  goToHome(){
    this.router.navigateByUrl('/')
  }

  gotocustomerregister(){
    this.router.navigateByUrl('/register')
  }
  
  registershop(){
      this.httpService.registerShop(this.formdata).subscribe((res : any)=>{
        this.userexist = false
      },
      (error:any) => {
        if(error.status === 400){
          this.userexist = true
        }
      }
    );
  }
}
