import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../model/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  coursArr !: ICourse[];
  beginnerArr !: ICourse[];
  advanceArr !: ICourse[]
  constructor(
    private _courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.course()
    this._courseService.updatedObj$
      .subscribe(res => {
        if (res) {
          console.log(res);
          
          this.course();
        }
      })
  }

  course() {
    this._courseService.fetchAllCourses()
      .subscribe(res => {
        this.beginnerArr = res.filter(cour => cour.category === "BEGINNER")
        this.advanceArr = res.filter(cour => cour.category === "ADVANCED")
      })
  }



}
