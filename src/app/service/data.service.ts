import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../model/Student';

@Injectable()
export class DataService {
selectedStudent:Student|null=null;
  constructor() { }


StudentSelected(model:Student){
    this.selectedStudent = model;
}
GetStudent(){
    return this.selectedStudent;
}
ClearSelected(){
    this.selectedStudent =null;
}
}