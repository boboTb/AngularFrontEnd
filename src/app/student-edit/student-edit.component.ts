import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kurs } from '../model/Kurs';
import { Kurs_Student } from '../model/Kurs_Student';
import { Student } from '../model/Student';
import { DataService } from '../service/data.service';
import { WebApiService } from '../service/web-api.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {
  ShowAdd:boolean =false;
  Kurs_ID:number =0;
  Student_ID:number = 0;
  ButtonText:string="";
  Broj_Indeksa:string="";
  Ime:string="";
  Prezime:string="";
  Godina:number=1;
  Status_Studenta:number=1;
  Student_Edit: Student | null = null;
  Student_Create: Student | null = null;
  KurseviStudenta:Kurs[] = [];
  Kursevi:Kurs[] =[];
  constructor(private webApiService: WebApiService, private router: Router,private data: DataService) { }

  ngOnInit(): void {
    
    this.webApiService.ReadCourses().subscribe(
      async (data) => {
        this.Kursevi = data;
      })
    this.Student_Edit = this.data.GetStudent();
    if(this.Student_Edit != null){
      this.KurseviStudenta=this.Student_Edit.Kursevi;
      this.Broj_Indeksa=this.Student_Edit.Broj_Indeksa;
      this.Ime = this.Student_Edit.Ime;
      this.Prezime = this.Student_Edit.Prezime;
      this.Godina = this.Student_Edit.Godina;
      this.Status_Studenta = this.Student_Edit.Status_Studenta;
      this.ButtonText="Izmjeni Studenta";
    }else{
      //console.log("nema selektovanog studenta");
      this.ButtonText="Dodaj Studenta";
    }
  }
  async CreateStudent() {
    if(this.Student_Edit == null){
    this.Student_Create = new Student(0, this.Broj_Indeksa, this.Ime, this.Prezime, this.Godina, this.Status_Studenta, this.KurseviStudenta);
    //console.log(this.MemberBasket);
    (await (this.webApiService.InsertStudent(this.Student_Create))).subscribe(
      async (data) => {
        console.log("student added");
        this.Student_ID = data;
       
        this.router.navigate(['/student']);

      }
    )
    }else{
      this.Student_Create = new Student(this.Student_Edit.Student_ID, this.Broj_Indeksa, this.Ime, this.Prezime, this.Godina, this.Status_Studenta,this.KurseviStudenta);
    //console.log(this.MemberBasket);
    (await (this.webApiService.ChangeStudent(this.Student_Create))).subscribe(
      (data) => {
        console.log("student updated");
        this.router.navigate(['/student']);
      }
    )
    }
  }

  async DeleteRelation(kurs:Kurs){
    if(confirm("Da li ste sigurni da zelite obriati kurs "+ kurs.Naziv_Kursa + " za ovog studenta ")) {
      if(this.Student_Edit != null){
      (await this.webApiService.DeleteKursForStudent(new Kurs_Student(kurs.Kurs_ID,this.Student_Edit.Student_ID))).subscribe(
        async (data) => {
          this.KurseviStudenta = this.KurseviStudenta.filter(item => item.Kurs_ID != kurs.Kurs_ID);
        })
      }
    }
  }
  GoBack(){
    this.router.navigate(['/student']);
  }
  async KursSelected() {
    this.ShowAdd = true;
    
     }
AddKursToStudent(){
  this.Kursevi.forEach(element => {
    if (element.Kurs_ID == this.Kurs_ID) {
      this.KurseviStudenta = this.KurseviStudenta.filter(item=>item.Kurs_ID != element.Kurs_ID)
      this.KurseviStudenta.push(element);
    }
  })
}
}
