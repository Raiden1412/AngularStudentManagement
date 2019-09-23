import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';
import { addCourse } from 'app/shared/model/addCourse';
import { debug } from 'util';
import add from '@angular/cli/commands/add';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    courseName: string;
    addcourse: addCourse;
    clicked = false;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {
        this.addcourse = new addCourse('', '', '', '');
    }

    courses: CourseDto[] = [];

    coursesWithTN: CourseWithTNDto[] = [];

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        debugger;
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    registerCourse(courseName: string) {
        console.log(courseName + 'is here');
        this.courseService.register(courseName).subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
        this.clicked = !this.clicked;
    }

    addCourse() {
        debugger;

        if (this.addcourse.courseName.length > 0 && this.addcourse.courseLocation.length > 0 && this.addcourse.courseContent.length > 0) {
            this.addcourse = new addCourse(
                this.addcourse.courseName,
                this.addcourse.courseLocation,
                this.addcourse.courseContent,
                this.addcourse.teacherId
            );
            this.courseService.addCourse(this.addcourse).subscribe(curDto => {
                if (!curDto) {
                    this.courses = [];
                } else {
                    this.courses = curDto;
                }
            });
        }
    }

    deleteCourse(courseName: string) {
        debugger;

        this.courseService.delete(courseName).subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    // registerCourse(courseName) {
    //
    // }

    clearAllCourses() {
        this.courses = [];
    }

    /*addCourseToStudent() {
        const courseName = 'temp';
        this.courseService.addCourseToStudent(courseName, currentUserCredential);
    }*/
}
