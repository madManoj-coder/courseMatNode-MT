import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap, take, tap } from 'rxjs';
import { ICourse, Ilesson } from '../../model/course';
import { CourseService } from '../../services/course.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseId !: string;
  courObj$ !: Observable<ICourse>;
  lesson$ !: Observable<Ilesson[]>;
  lessonForm !: FormGroup;
  constructor(
    private _route: ActivatedRoute,
    private _courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.createLessonForm()
    this.courseId = this._route.snapshot.params['courseId']
    this.courObj$ = this._courseService.getCourse(this.courseId);
    this.lesson$ = this._courseService.getLesson(this.courseId);
    this.searchCourse()
    // console.log(this.lessonForm.value);
  }

  createLessonForm() {
    this.lessonForm = new FormGroup({
      lesson : new FormControl(null, [Validators.required])
    })
  }

  searchCourse() {
    this.lesson$ = this._courseService.getLesson(this.courseId, 10, "")
    this.lesson$ = this.lessonForm.get('lesson')?.valueChanges
      .pipe(
        startWith(''),
        tap(res => console.log(res)),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(val => this._courseService.getLesson(this.courseId, 10, val))
      ) as Observable<Ilesson[]>
  }

}
