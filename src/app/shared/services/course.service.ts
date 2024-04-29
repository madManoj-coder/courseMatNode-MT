import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICourse, ICourseResp, Ilesson, IlessonsResp } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl: string = `${environment.baseUrl}/courses`;
  updatedObj$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _http: HttpClient
  ) { }

  fetchAllCourses(): Observable<ICourse[]> {
    return this._http.get<ICourseResp>(this.courseUrl)
      .pipe(
        map(res => res['payload'])
      )
  }

  updatedCour(course: ICourse): Observable<ICourse> {
    let updtUrl = `${this.courseUrl}/${course.id}`
    return this._http.put<ICourse>(updtUrl, course)
  }

  getCourse(courseId: string) {
    let courseUrl = `${this.courseUrl}/${courseId}`
    return this._http.get<ICourse>(courseUrl);
  }

  getLesson(courseId: string, pageSize: number = 10, filter = ''): Observable<Ilesson[]> {
    let courLesson = `${environment.baseUrl}/lessons`;
    let params = new HttpParams()
      .set("courseId", courseId)
      .set("pageSize", pageSize)
      .set("filter", filter)
    return this._http.get<IlessonsResp>(courLesson, {
      params: params
    })
      .pipe(
        map(res => {
          // console.log(res);
          return res['payload']
        })
      )
  }
}
