import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomerRegisterComponent } from './components/register/customer-register/customer-register.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component:  LandingPageComponent  },
  { path: 'register', component:  RegisterComponent  },
];
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegisterComponent,
    CustomerRegisterComponent,
  
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
