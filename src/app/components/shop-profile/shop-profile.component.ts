import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.css']
})

export class ShopProfileComponent implements OnInit{
  shopProfile:any = {
    "_id":"",
    "username":"",
    "email":"",
    "address":"",
    "profileImage":"",
    "profileImagename":"",
    "stars":""
  }
  imgurl =  this.shopProfile['profileImagename']

  constructor(private router:Router,private httpservice: HttpService){
    
  }

  ngOnInit(): void {
    this.httpservice.getShopProfile({'_id':localStorage.getItem('userid')}).subscribe((res:any)=>{
      this.shopProfile = res.user
      this.imgurl = this.shopProfile['profileImagename']
    });
  }
  gotoHome(){
    this.router.navigateByUrl('/')
  }
  logout(){
    localStorage.removeItem('usertype')
    localStorage.removeItem('userid')
    localStorage.removeItem('token')
    this.router.navigateByUrl('/')
  }
}
