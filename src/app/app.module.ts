import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './shared/components/home/home.component';
import { CourseComponent } from './shared/components/course/course.component';
import { CourseCardComponent } from './shared/components/course-card/course-card.component';
import { CourseFormComponent } from './shared/components/course-form/course-form.component';
import { AboutComponent } from './shared/components/about/about.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseDialogComponent } from './shared/components/course-dialog/course-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseComponent,
    CourseCardComponent,
    CourseFormComponent,
    AboutComponent,
    PageNotFoundComponent,
    CourseDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
