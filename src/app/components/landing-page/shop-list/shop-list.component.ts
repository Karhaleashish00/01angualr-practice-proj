import { Component, Input, } from '@angular/core';


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent {
  @Input()
  shops:any 
} 
