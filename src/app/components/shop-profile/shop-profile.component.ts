import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.css']
})

export class ShopProfileComponent {

  constructor(private router:Router){

  }
  logout(){
    localStorage.removeItem('usertype')
    localStorage.removeItem('userid')
    localStorage.removeItem('token')
    this.router.navigateByUrl('/')
  }
}
