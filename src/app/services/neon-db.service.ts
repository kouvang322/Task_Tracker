import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'pg';

@Injectable({
  providedIn: 'root'
})
export class NeonDbService {

  // private client: Client;
  
  constructor(private http: HttpClient) {
    // this.client = new Client({
    //   connectionString:
    // });
    
    // this.client.connect();
    
  }

  connectToDatabase(){

  }
  
  sayHello(){
    console.log("hi, you are connected to service");
  }

}
