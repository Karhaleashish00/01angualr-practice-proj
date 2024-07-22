import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit{

public dialog: string

public isDetailsHide:Boolean =true
public enablesave:boolean = false
private user:{}
uploadedFiles: any[] = [];
public userProfile:{}={}
imgurl = "assets/" + this.userProfile['filename']
posts:any

constructor(private router:Router,private httpservice: HttpService){  
  const navigation = this.router.getCurrentNavigation();
  const state = navigation?.extras.state
  this.user = state
}
  ngOnInit(): void {
    // this.httpservice.getcustpost().subscribe((res:any)=>{
    //     console.log(res)
    // });
    if(localStorage.getItem('userid')){
      this.httpservice.getCustomerProfile({'_id':localStorage.getItem('userid')}).subscribe((res:any)=>{
        this.userProfile = res.user
        this.imgurl = "assets/" + this.userProfile['filename']
        this.posts = this.userProfile['postimages']
        console.log(this.posts);
        
      });
    }
    else{
      this.httpservice.getCustomerProfile(this.user).subscribe((res:any)=>{        
        this.userProfile = res.user
        this.imgurl = "assets/" + this.userProfile['filename']
        this.posts = this.userProfile['postimages']
        console.log(this.posts);  
        localStorage.setItem('userid',this.userProfile['_id'])        
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    this.router.navigateByUrl('/')
  }
  gotoHome(){
    this.router.navigateByUrl('/')
  }
  gotoimgpost(){
    this.router.navigateByUrl('imagepost')
  }

  savedetails(){
    this.httpservice.setCustomerDetails({'dialog': this.dialog,'_id':localStorage.getItem('userid')}).subscribe((res:any)=>{
      this.ngOnInit()
    })
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
  onUploadfile(event){
    this.uploadedFiles.push(event.files[0]) 
    this.httpservice.setCustomerProfileImage(event.files[0]).subscribe((res:any)=>{
    }) 
    this.ngOnInit()
  }
}
