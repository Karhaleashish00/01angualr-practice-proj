import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { FormsModule } from '@angular/forms';
import { ShopListComponent } from './components/landing-page/shop-list/shop-list.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { DataViewModule } from 'primeng/dataview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { NavbarComponent } from './components/landing-page/navbar/navbar.component';
import { ShopLoginComponent } from './components/shop-login/shop-login.component';
import { ShopRegisterComponent } from './components/shop-register/shop-register.component';
import { RegmsgComponent } from './components/customer-register/regmsg/regmsg.component';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { ShopProfileComponent } from './components/shop-profile/shop-profile.component';
import { SplitterModule } from 'primeng/splitter';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: CustomerRegisterComponent },
  { path: 'login', component: CustomerLoginComponent},
  { path: 'customerProfile' , component:CustomerProfileComponent},
  { path: 'shopLogin' , component:ShopLoginComponent},
  { path: 'shopRegister' , component:ShopRegisterComponent},
  { path: 'regmsg', component:RegmsgComponent},
  { path: 'shopProfile',component:ShopProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CustomerRegisterComponent,
    ShopListComponent,
    CustomerLoginComponent,
    CustomerProfileComponent,
    NavbarComponent,
    ShopLoginComponent,
    ShopRegisterComponent,
    RegmsgComponent,
    ShopProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    DataViewModule,
    ScrollPanelModule,
    TabViewModule,
    CardModule,
    PasswordModule,
    FileUploadModule,
    SplitterModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
