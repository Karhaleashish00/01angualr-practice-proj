import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regmsg',
  templateUrl: './regmsg.component.html',
  styleUrls: ['./regmsg.component.css']
})
export class RegmsgComponent {
  @Input()
  public msg: string = 'default'
  public flag:boolean

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { message: string,flag:string };
    console.log("state : ",state)    
    this.msg = state.message
    if(state.flag == 'green'){
      this.flag = true
    }
    else{
      this.flag = false
    }

    console.log("message" , this.msg);
    
    
  }

  gotoHome() {
    this.router.navigateByUrl('/')
  }
}
