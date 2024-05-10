import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: String = ''
  password: String = ''
  ispassvalid:Boolean = true

  getusername(event: any) {
    this.username = event.target.value
  }
  getpassword(event: any) {
    let length:Boolean
    this.password = event.target.value
    length = this.checkPassword()
    if(length){
      this.ispassvalid = length
    }
    else{
      this.ispassvalid = length
    }
  }

  checkPassword(){
    if(this.password.length < 8){
      return false
    }
    else{
      return true
    }
  }
}
