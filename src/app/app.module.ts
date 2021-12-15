import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './service/CustomHttpInterceptor';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { KursComponent } from './kurs/kurs.component'
import { DataService } from './service/data.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'student', component: StudentComponent },
  { path: 'create', component: StudentEditComponent },
  { path: 'kursevi', component: KursComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    StudentEditComponent,
    KursComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [DataService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
