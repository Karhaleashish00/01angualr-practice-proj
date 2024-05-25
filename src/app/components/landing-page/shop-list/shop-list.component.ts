import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent {
  @Input()
  shops:{
    image : string,
    title : string,
    address : string,
    stars :number,
    str1 : boolean,
    str2 : boolean,
    str3 : boolean,
    str4 : boolean,
    str5 : boolean
  }[] = []

}
