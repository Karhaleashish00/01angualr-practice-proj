import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = "http://127.0.0.1:5000"
  constructor(private http: HttpClient) { }

  registerCustomer(object){
    return this.http.post(this.baseUrl + '/registerCustomer',object)
  }

  registerShop(object){
    return this.http.post(this.baseUrl + '/registerShop',object)
  }

  getCustomerRegisters(object){
    return this.http.post(this.baseUrl + '/getCustomerRegisters',object)
  }

  getShopRegisters(object){
    return this.http.post(this.baseUrl + '/getShopRegisters',object)
  }

  getAllShopRegisters(){
    return this.http.get(this.baseUrl + '/getAllShopRegisters')
  }

  getCustomerProfile(object){
    return this.http.post(this.baseUrl + '/getCustomerProfile',object)
  }
  setCustomerDetails(object){
    return this.http.post(this.baseUrl + '/setcustomerdetail',object )
  }
  setCustomerProfileImage(file:File){
    console.log("I am here in setCustomerProfileImage");
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('_id',localStorage.getItem('userid'))
    return this.http.post(this.baseUrl + '/setCustomerProfileImage',formData,)
  }
}
