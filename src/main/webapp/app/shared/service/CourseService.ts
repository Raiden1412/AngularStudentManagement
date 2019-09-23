import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { SERVER_API_URL } from 'app/app.constants';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';
import { addCourse } from 'app/shared/model/addCourse';

@Injectable()
export class CourseService {
    private courseAddressUrl = SERVER_API_URL + '/api/course/findAllCoursesDto';
    private courseAddressWithTNUrl = SERVER_API_URL + '/api/course/findAllCoursesWithTNDto';
    private courseDeleteUrl = SERVER_API_URL + '/api/course/deleteCourse';
    private courseUpdateUrl = SERVER_API_URL + '/api/course/updateCourse';
    private addCourseToStudentUrl = SERVER_API_URL + '/api/course/addCourseToStudent';
    private addCourseUrl = SERVER_API_URL + '/api/course/addCourse';
    private courseRegisterUrl = SERVER_API_URL + '/api/course/registerCourse';

    constructor(private http: HttpClient) {}

    getCourseInfo(): Observable<CourseDto[]> {
        debugger;
        return this.http.get<CourseDto[]>(`${this.courseAddressUrl}`);
    }

    getCourseInfoWithTN(): Observable<CourseWithTNDto[]> {
        return this.http.get<CourseWithTNDto[]>(`${this.courseAddressWithTNUrl}`);
    }

    delete(courseName: String): Observable<CourseDto[]> {
        return this.http.delete<CourseDto[]>(`${this.courseDeleteUrl}/${courseName}`);
    }

    addCourse(addingCourse: addCourse): Observable<CourseDto[]> {
        return this.http.post<CourseDto[]>(this.addCourseUrl, addingCourse);
    }

    update(course: CourseDto): Observable<Response> {
        return this.http.put<Response>(this.courseUpdateUrl, course);
    }

    register(courseName: String): Observable<CourseDto[]> {
        debugger;
        console.log('jinlaile4');
        console.log(courseName);
        return this.http.post<CourseDto[]>(this.courseRegisterUrl, courseName);
    }

    addCourseToStudent(course: CourseDto) {
        return this.http.post(SERVER_API_URL + '/api/course/addCourseToStudent', { course });
    }
}
