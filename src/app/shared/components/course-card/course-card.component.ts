import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() getCourse !: ICourse
  constructor(
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  onEdit() {
    let dialogConfg = new MatDialogConfig();
    dialogConfg.width = "400px";
    dialogConfg.data = this.getCourse;
    const dialogRef = this._matDialog.open(CourseFormComponent, dialogConfg);
  }

}
