import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
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
  constructor(private router: Router) { }
  Register(){
    this.router.navigateByUrl('/register');
  }

  Login(){
    this.router.navigateByUrl('/login')
  }
}
