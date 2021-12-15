import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from "@angular/common/http";
import { AuthenticateModel } from '../model/AuthenticateModel'
import { Student } from '../model/Student';
import { Kurs } from '../model/Kurs';
import { Kurs_Student } from '../model/Kurs_Student';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  root:string="http://localhost:58544";
    HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    })
  };
  constructor(private httpClient:HttpClient ) { }

  public Login(model:AuthenticateModel):Observable<any>
  {
      
      let grant_type = "password"
      let headers = new HttpHeaders();
      headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
      let user = "username="+model.Username+'&'+"password="+model.Password+'&'+"grant_type=" + grant_type;
      return this.httpClient.post("http://localhost:58544/token", user,{"headers": headers}) as Observable<any>;       

  }
  ReadStudentProcedure() {
    return this.httpClient.get<Student[]>(
      this.root + `/api/student/ReadStudentProcedure`
    );
  }
  ReadStudent() {
    return this.httpClient.get<Student[]>(
      this.root + `/api/student/GetAllStudents`
    );
  }
  ReadCourses() {
    return this.httpClient.get<Kurs[]>(
      this.root + `/api/kurs/GetAllCourses`
    );
  }
  async InsertStudent(model:Student) { 
    return await this.httpClient.post<any>(
      this.root + `/api/student/InsertStudent`,model
    );
  }
  async InsertKurs(model:Kurs) { 
    return await this.httpClient.post<any>(
      this.root + `/api/kurs/InsertKurs`,model
    );
  }

  async ChangeStudent(model:Student) { 
    return await this.httpClient.post(
      this.root + `/api/student/UpdateStudent`,model
    );
  }
 
  async DeleteStudent(StudentId:number){
    return this.httpClient.delete(
      this.root + `/api/student/DeleteStudent/${StudentId}`
    );
  }
  InsertKursForStudent(model:Kurs_Student) { 
    return this.httpClient.post<any>(
      this.root + `/api/KursStudent/InsertCourseStudent`,model
    );
  }
  async DeleteKursForStudent(model:Kurs_Student){
    return this.httpClient.post(
      this.root + `/api/KursStudent/DeleteCourseStudent`,model
    );
  }

}
