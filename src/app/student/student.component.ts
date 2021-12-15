import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Kurs } from '../model/Kurs';
import { Student } from '../model/Student';
import { DataService } from '../service/data.service';
import { WebApiService } from '../service/web-api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  ButtonText1: string = "Prikazi sve studente";
  ShowS: boolean = false;
  ShowK: boolean = false;
  model: Student | null = null;
  Kurs_ID: number = 0;
  Student_ID: number = 0;
  ActiveStudent: Student[] = [];
  Kursevi: Kurs[] = [];
  Student: Student[] = [];
  StudentKurs: Kurs[] = [];
  constructor(private webApiService: WebApiService, private router: Router, private data: DataService) { }

  async ngOnInit(): Promise<void> {

    this.webApiService.ReadStudent().subscribe(
      async (data) => {
        this.Student = data;
        this.Student.push(new Student(0, "", "Svi", "Studenti", 1, 1, []))

      }),
      this.webApiService.ReadCourses().subscribe(
        async (data) => {
          this.Kursevi = data;
          this.Kursevi.push(new Kurs(0, "Svi Kursevi"))
        })
  }

  NoviStudent() {
    this.data.ClearSelected();
    this.router.navigate(['/create']);
  }
  PikaziKurseve() {
    this.router.navigate(['/kursevi']);
  }

  PikaziStudente() {
    if (this.ShowS == false) {
      this.ShowS = true;
      if (this.Kurs_ID != 0) {
        this.KursSelected();
      } else {
        this.ActiveStudent = [];
        this.Student.forEach(element => {
          if (element.Student_ID != 0) {
            this.ActiveStudent.push(element)
          }
        });
      }
      this.ButtonText1 = "Ukloni studente";
    } else {
      this.ShowS = false;
      this.ButtonText1 = "Prikazi sve studente";
    }
  }

  ChangeMember(m: Student) {

    this.data.StudentSelected(m);
    this.router.navigate(['/create']);
  }

  async DeleteMember(m: Student) {
    if(confirm("Da li ste sigurni da zelite obrisati studenta "+ m.Ime + " " + m.Prezime)) {

      (await this.webApiService.DeleteStudent(m.Student_ID)).subscribe(
        async (data) => {
          console.log("Obrisan");
          this.webApiService.ReadStudent().subscribe(
            async (data) => {
              this.Student = data;
              this.Student.push(new Student(0, "", "Svi", "Studenti", 1, 1, []))
              this.ActiveStudent=[];
              this.Student.forEach(element => {
                if (element.Student_ID != 0) {
                  this.ActiveStudent.push(element);
                }
              });
              this.ShowS=true;
            })
        })
    }
  }
  KursSelected() {
    this.ActiveStudent = [];

    this.Student.forEach(element => {
      
      if (this.Kurs_ID != 0) {
        this.ShowS = true;
        this.ButtonText1 = "Ukloni studente";
        if (element.Student_ID != 0) {
          element.Kursevi.forEach(e => {
            if (e.Kurs_ID == this.Kurs_ID) {
              this.ActiveStudent.push(element);
            }
          });
        }
      } else {
        this.ShowS = false;
        this.ButtonText1 = "Prikazi sve studente";
        if (element.Student_ID != 0) {
          this.ActiveStudent.push(element);
        }
      }
    });

  }
  StudentSelected() {
    this.Student.forEach(element => {
      if (this.Student_ID != 0) {
        this.ShowK = true;
        if (element.Student_ID == this.Student_ID) {
          this.data.StudentSelected(element);
          this.StudentKurs = element.Kursevi;
        }
      } else {
        this.ShowK = false;
        this.StudentKurs = [];
        this.Kursevi.forEach(element => {
          if (element.Kurs_ID != 0) {
            this.StudentKurs.push(element);
          }
        });
      }

    });

  }
}
