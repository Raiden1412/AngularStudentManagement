package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.domain.UserCourse;
import com.mycompany.myapp.domain.dto.CourseDto;
import com.mycompany.myapp.domain.dto.CourseWithTNDto;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import javax.persistence.Cacheable;
import java.util.List;
import java.util.Optional;


@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
//    @Query("SELECT Course FROM course c  WHERE c.name = :courseName")
//    Course findCourseByCourseName(@Param("courseName") String courseName);

    @Query("SELECT new com.mycompany.myapp.domain.dto.CourseDto(c.courseName,c.courseLocation,c.courseContent,c.teacherId) FROM Course c INNER JOIN UserCourse uc on c.id=uc.course WHERE uc.user=3")
    List<CourseDto> findRegistration();


    @Query("SELECT new com.mycompany.myapp.domain.dto.CourseDto(c.courseName, c.courseLocation, c.courseContent, c.teacherId) from Course c")
    List<CourseDto> findAllCoursesDto();


    @Query("SELECT new com.mycompany.myapp.domain.dto.CourseWithTNDto(c.courseName, c.courseLocation, c.courseContent, u.login) from Course c left join User u on c.teacherId = u.id")
    List<CourseWithTNDto> findAllCoursesDtoWithTeacherName();

    @Query("SELECT new com.mycompany.myapp.domain.dto.CourseDto(c.courseName,c.courseLocation,c.courseContent,c.teacherId) FROM Course c WHERE LENGTH(c.courseName)>:num")
    List<CourseDto> findCourseLargerThan10(@Param("num") int num);

    Optional<Course> findCourseByCourseName(String courseName);





}
