import { Injectable } from '@angular/core';
import { Client } from 'pg';

@Injectable({
  providedIn: 'root'
})
export class NeonDbService {

  private client: Client;
  
  constructor() {
    this.client = new Client({
      connectionString:"postgresql://My-ListOfTasks_owner:TAGXKLeP3Wr7@ep-rough-bar-a5rs74sk.us-east-2.aws.neon.tech/My-ListOfTasks?sslmode=require"
    });
    
    this.client.connect();
    
  }

  connectToDatabase(){
    

  }
  
  sayHello(){
    console.log("hi, you are connected to service");
  }

}
