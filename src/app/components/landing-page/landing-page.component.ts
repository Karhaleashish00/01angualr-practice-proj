import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  shop:{}={}
  shops = [
    {
      image : "assets/barbar.jpg",
      title : "Title 1",
      address : "Address 1",
      stars : 4,
      str1 : true,
      str2 : true,
      str3 : true,
      str4 : true,
      str5 : false
    },
    {
      image : "assets/barbar.jpg",
      title : "Title 2",
      address : "Address 2",
      stars : 3,
      str1 : true,
      str2 : true,
      str3 : true,
      str4 : false,
      str5 : false
    },
    {
      image : "assets/barbar.jpg",
      title : "Title 3",
      address : "Address 3",
      stars : 5,
      str1 : true,
      str2 : true,
      str3 : true,
      str4 : true,
      str5 : true
    },
    {
      image : "assets/barbar.jpg",
      title : "Title 4",
      address : "Address 4",
      stars : 4,
      str1 : true,
      str2 : true,
      str3 : true,
      str4 : true,
      str5 : false
    },
    {
      image : "assets/barbar.jpg",
      title : "Title 5",
      address : "Address 5",
      stars : 3,
      str1 : true,
      str2 : true,
      str3 : true,
      str4 : false,
      str5 : false
    },
    {
      image : "assets/barbar.jpg",
      title : "Title 6",
      address : "Address 6",
      stars : 4,
      str1 : true,
      str2 : true,
      str3 : true,
      str4 : true,
      str5 : false
    }
  ]
  constructor(private router: Router,private httpservice:HttpService) { }
  ngOnInit(){
    this.httpservice.getAllShopRegisters().subscribe((res)=>{
      console.log("shops : ", res);
      this.shop = res
    })
  }
  
}
