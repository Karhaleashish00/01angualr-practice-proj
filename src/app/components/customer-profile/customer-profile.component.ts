import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent {

public isDetailsHide:Boolean =true
public enablesave:boolean = false

constructor(private router:Router){}
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/')
  }
  gotoHome(){
    this.router.navigateByUrl('/')
  }

  edit(){
    this.enablesave = !this.enablesave
    if (this.isDetailsHide){
      const perDetailsEle : HTMLElement = document.getElementById('personalDetails')
      const gallery : HTMLElement = document.getElementById('gallery')
      perDetailsEle.hidden = false
      gallery.classList.remove('col-12')
      gallery.classList.add('col-6')
      this.isDetailsHide = false
    }
    else{
      const perDetailsEle : HTMLElement = document.getElementById('personalDetails')
      const gallery : HTMLElement = document.getElementById('gallery')
      perDetailsEle.hidden = true
      gallery.classList.remove('col-6')
      gallery.classList.add('col-12')
      this.isDetailsHide = true
    }
  }
}
