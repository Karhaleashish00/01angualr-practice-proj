import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: CustomerRegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CustomerRegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
