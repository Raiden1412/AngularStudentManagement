import { CourseDto } from 'app/shared/model/course-dto.model';

export class addCourse implements CourseDto {
    constructor(public courseName: string, public courseLocation: string, public courseContent: string, public teacherId: string) {}
}
