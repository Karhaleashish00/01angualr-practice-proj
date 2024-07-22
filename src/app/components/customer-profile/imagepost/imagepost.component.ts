import { Component, createPlatform } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-imagepost',
  templateUrl: './imagepost.component.html',
  styleUrls: ['./imagepost.component.css']
})
export class ImagepostComponent {
  selectedImg:any;
  imageUrl:any;
  desc:string = '';
  constructor(private httpservice: HttpService,private router:Router){}
  onPost(event){
    this.selectedImg = event.files[0];
    console.log("img : ",this.selectedImg)
    this.imageUrl = URL.createObjectURL(this.selectedImg);
    // this.httpservice.setpostimages(event.files[0]).subscribe((res:any)=>{
    // }) 
  }
  postimage(){
    const object = {'file' : this.selectedImg,
      'desc' : this.desc
    }
    this.httpservice.setpostimages(object).subscribe((res:any)=>{
    }) 
    this.router.navigateByUrl('/customerProfile')
  }
  back(){
    this.router.navigateByUrl('/customerProfile')
  }
}
