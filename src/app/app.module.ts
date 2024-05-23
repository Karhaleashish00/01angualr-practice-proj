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

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: CustomerRegisterComponent },
  { path: 'login', component: CustomerLoginComponent},
  { path: 'customerProfile' , component:CustomerProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CustomerRegisterComponent,
    ShopListComponent,
    CustomerLoginComponent,
    CustomerProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    DataViewModule,
    ScrollPanelModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
