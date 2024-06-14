import { Component } from '@angular/core';
import { registerData } from 'src/model/from-data.component';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';


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
  userexist:boolean = false


  goToHome(){
    this.router.navigateByUrl('/')
  }

  gotoshopregister(){
    this.router.navigateByUrl('/shopRegister')
  }
  
  registerCustomer(){
      this.httpService.registerCustomer(this.formdata).subscribe((res : any)=>{
        this.userexist = false
        const msg = { message :"You are register sucessfully",flag:'green'}
        this.router.navigate(['/regmsg'], {state :msg});
      },
      (error:any) => {
        if(error.status === 409){
          this.userexist = true
          const msg = { message :"User already exist", flag:'red'}
          this.router.navigate(['/regmsg'], {state : msg});
        }
      }
    );
  }
}
