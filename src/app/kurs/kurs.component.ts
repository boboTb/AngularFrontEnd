import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Kurs } from '../model/Kurs';
import { Kurs_Student } from '../model/Kurs_Student';
import { Student } from '../model/Student';
import { DataService } from '../service/data.service';
import { WebApiService } from '../service/web-api.service';

@Component({
  selector: 'app-kurs',
  templateUrl: './kurs.component.html',
  styleUrls: ['./kurs.component.scss']
})
export class KursComponent implements OnInit  {
  ShowAdd:boolean=false;
  Naziv_Kursa:string="";
  model: Student | null = null;
  ShowS:boolean=false;
  Kurs_ID:number=0;
  Student_ID:number=0;
  ActiveCourses: Kurs[] = [];
  Student:Student[]=[];
  ActiveStudent:Student[]=[];
  StudentiNaKursu:Student[]=[];
  constructor(private webApiService: WebApiService, private router: Router,private data: DataService) { }

  ngOnInit(): void {
    this.model = this.data.GetStudent();
    console.log(this.model?.Prezime);
    this.webApiService.ReadStudent().subscribe(
      async (data) => {
        this.Student = data;

      }),
      this.webApiService.ReadCourses().subscribe(
        async (data) => {
          this.ActiveCourses = data;
        })
  
  }
  StudentSelected(){
    this.ShowAdd = true;
  }
  async CreateKurs(){
    (await this.webApiService.InsertKurs(new Kurs(0,this.Naziv_Kursa))).subscribe(
      async (data) => {
        this.Kurs_ID = data;
        this.StudentiNaKursu.forEach(async element => {
          (await this.webApiService.InsertKursForStudent(new Kurs_Student(this.Kurs_ID,element.Student_ID))).subscribe(
            (data) =>{
              
            }
          )
        })
        this.router.navigate(['/student']);
      })
  }
  AddKursToStudent(){
    
    this.Student.forEach(element => {
      if (element.Student_ID == this.Student_ID) {
        this.StudentiNaKursu = this.StudentiNaKursu.filter(item=>item.Student_ID != element.Student_ID)
        this.StudentiNaKursu.push(element);
      }
    })
  }
  GoBack(){
    this.router.navigate(['/student']);
  }
  async DeleteRelation(student:Student){
    if(confirm("Da li ste sigurni da zelite obrisati studenta "+ student.Prezime + " za ovaj kurs ")) {
      this.StudentiNaKursu = this.StudentiNaKursu.filter(item =>item.Student_ID != student.Student_ID);
    }
  }
  CourseSelected(m:Kurs){

    this.Kurs_ID = m.Kurs_ID;
    this.ActiveStudent = [];
    this.ShowS = true;
    this.Student.forEach(element => {
      
      if (this.Kurs_ID != 0) {
        
          element.Kursevi.forEach(e => {
            if (e.Kurs_ID == this.Kurs_ID) {
              this.ActiveStudent.push(element);
            }
          });
        
      } 
      
    });
  }
}
