import { Kurs } from "./Kurs";

export class Student
{
    constructor(Student_ID:number,
        Broj_Indeksa:string,
        Ime:string,
        Prezime:string,
        Godina:number,
        Status_Studenta:number,
        Kursevi:Kurs[]
        ){
            this.Student_ID=Student_ID,
            this.Broj_Indeksa=Broj_Indeksa,
            this.Ime=Ime,
            this.Prezime=Prezime,
            this.Godina = Godina,
            this.Status_Studenta=Status_Studenta,
            this.Kursevi=Kursevi
    }

    public Student_ID:number;
    public Broj_Indeksa:string;
    public Ime:string;
    public Prezime:string;
    public Godina:number;
    public Status_Studenta:number;
    public Kursevi:Kurs[]
}