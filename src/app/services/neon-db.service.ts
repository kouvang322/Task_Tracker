import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../interfaces/Task';
import { User } from '../interfaces/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NeonDbService {

  private baseUrl = environment.baseUrl;

  private user: {loggedinUser_Id: Number, loggedinUsername: string} | null = null;

  setUser(user: { loggedinUser_Id: Number, loggedinUsername: string }) {
    this.user = user;
  }

  userLoggedIn(){
    if(this.user === null){
      return false;
    }else{
      return true;
    }
  }

  // getUser(){
  //   this.user;
  // }

  constructor(private http: HttpClient) {}

  getData(): Observable<Task[]> {
    if (this.user) {
      const userId = this.user.loggedinUser_Id;
      if (userId) {
        console.log(userId);
        return this.http.get<Task[]>(`${this.baseUrl}/dashboard/api/data/${userId}`);
      } else {
        console.error('User ID is not defined');
        return of([]); // Return an empty array as an observable
      }
    } else {
      console.error('User is not defined');
      return of([]); // Return an empty array as an observable
    }
  }
  

  createTaskItem(newTask: object, userId: Number): Observable<Task>{
    console.log(newTask);
    
    return this.http.post<Task>(`${this.baseUrl}/dashboard/api/data/createTask`, {newTask, userId});
  }

  taskInfoChanged(task: Task, user_id: Number): Observable<Task> {
    console.log(user_id);

    return this.http.patch<Task>(`${this.baseUrl}/dashboard/api/data/updateTask`, {task, user_id})
  }

  deleteTask(taskId: number): Observable<Task>{
    console.log(taskId);
    // console.log("Delete this task");
    return this.http.delete<Task>(`${this.baseUrl}/dashboard/api/data/deleteTask/${taskId}`);
  }

  createNewUser(username: string, password: string): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/loginOrRegister/api/data/register`, {username, password});
  }

  getUserInfo(username: string, password: string): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/loginOrRegister/api/data/login/user`, {username, password});
  }
  
  logout(){
    this.user = null;
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
  }
}
