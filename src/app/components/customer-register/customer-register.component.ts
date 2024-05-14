import { Component } from '@angular/core';
import { registerData } from 'src/model/from-data.component';
import { Router } from '@angular/router';
import { HttpService } from './../../http.service';


@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {
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

  
  registerCustomer(){
      this.httpService.registerCustomer(this.formdata).subscribe((res : any)=>{
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
