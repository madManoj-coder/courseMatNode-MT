import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { ICourse } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseForm !: FormGroup;
  courseData !: ICourse
  constructor(
    @Inject(MAT_DIALOG_DATA) private course: ICourse,
    private _matDialogRef: MatDialogRef<CourseDialogComponent>,
    private _fb: FormBuilder,
    private _courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.createCourForm();
    this.courseData = this.course;
    this.courseForm.patchValue(this.course)
  }

  createCourForm() {
    this.courseForm = this._fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      releaseAt: ['', Validators.required],
      longDescription: ['', Validators.required]
    })
  }

  get f() {
    return this.courseForm.controls
  }

  onSave() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      let updatedCour = { ...this.courseForm.value, id: this.courseData.id }
      console.log(updatedCour);
      this._courseService.updatedCour(updatedCour)
        .subscribe(res => {
          // console.log(res);
          this._courseService.updatedObj$.next(true)
          this._matDialogRef.close()
        })
    }
  }

  onCloseCour() {
    this._matDialogRef.close()
  }



}
