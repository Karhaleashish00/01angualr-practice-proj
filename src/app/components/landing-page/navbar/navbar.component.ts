import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public islogin:Boolean = false
  constructor(private router: Router){
    this.islogin = false
    if(localStorage.getItem('token')){
      this.islogin = true
    }
  }

  Register(){
    this.router.navigateByUrl('/register');
  }

  gotoProfile(){
    if(localStorage.getItem('usertype')==="customer"){
      this.router.navigateByUrl('/customerProfile')
    }
    else{
      this.router.navigateByUrl('/shopProfile')
    }
  }

  Login(){
    if(localStorage.getItem('token')){
      this.router.navigateByUrl('/customerProfile')
    }
    else{
      this.router.navigateByUrl('/login')
    }
  }
}
