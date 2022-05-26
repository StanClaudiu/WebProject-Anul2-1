----HERE WE HAVE THE COURSES

DROP SEQUENCE course_seq /* STATEMENT */;

DROP TABLE courses CASCADE CONSTRAINTS /* STATEMENT */;



CREATE TABLE courses(
    id_curs INT PRIMARY KEY,
    parent_id INT DEFAULT -1,
    course_content VARCHAR2(1000) NOT NULL,
    description_course VARCHAR2 (200) NOT NULL,
    course_name VARCHAR2 (100) NOT NULL,
    image_path_download VARCHAR2(100) NOT NULL,
    course_video_path VARCHAR2(100),
     CONSTRAINT fk_child_course 
        FOREIGN KEY (parent_id)
        REFERENCES courses(id_curs)
        ON DELETE CASCADE
)/* STATEMENT */;

CREATE SEQUENCE course_seq START WITH 1 /* STATEMENT */;

-----HERE I WILL IMPLEMENT THE PACKAGE

CREATE OR REPLACE PACKAGE courses_package IS
    
    TYPE base_type IS TABLE OF courses%ROWTYPE;
    
    FUNCTION create_course(p_parent_id courses.parent_id%TYPE,      p_course_content courses.course_content%TYPE,
                        p_description_course courses.description_course%TYPE,       p_course_name courses.course_name%TYPE,
                        p_image_path_download courses.image_path_download%TYPE,     p_course_video_path courses.course_video_path%TYPE) RETURN INT;
    FUNCTION update_course (p_id_curs INT,p_parent_id courses.parent_id%TYPE,      p_course_content courses.course_content%TYPE,
                        p_description_course courses.description_course%TYPE,       p_course_name courses.course_name%TYPE,
                        p_image_path_download courses.image_path_download%TYPE,     p_course_video_path courses.course_video_path%TYPE) RETURN INT;
    FUNCTION getAllCourses RETURN base_type PIPELINED;
    FUNCTION getById(p_id_curs INT) RETURN base_type PIPELINED;
END courses_package;/* STATEMENT */

CREATE OR REPLACE PACKAGE BODY courses_package IS
    
    ----when u create a course, it can be a parent or child, but a direct child! the parrents have null as parent
    FUNCTION create_course(p_parent_id courses.parent_id%TYPE,      p_course_content courses.course_content%TYPE,
                        p_description_course courses.description_course%TYPE,       p_course_name courses.course_name%TYPE,
                        p_image_path_download courses.image_path_download%TYPE,     p_course_video_path courses.course_video_path%TYPE) RETURN INT IS
                        v_number_id INT;
                        v_value_parent INT;
                             PRAGMA AUTONOMOUS_TRANSACTION;
                        BEGIN
                             IF p_parent_id>0 OR p_parent_id<=0 THEN ---aici intra numerele
                                 IF   p_parent_id>0 THEN
                                -----let's verify if our parent is not a child!
                                  SELECT parent_id INTO v_number_id FROM courses WHERE id_curs=p_parent_id;
                                    IF  v_number_id>0 THEN
                                        raise_application_error(-20001,'Woops!something is wrong, a negative number');
                                    ELSE
                                        INSERT INTO courses VALUES(course_seq.NEXTVAL,p_parent_id,p_course_content,p_description_course,p_course_name,p_image_path_download,p_course_video_path);
                                        COMMIT;
                                        SELECT course_seq.CURRVAL INTO v_number_id FROM DUAL;
                                        RETURN v_number_id;
                                    END IF;
                                    ELSE
                                     raise_application_error(-20001,'Woops!something is wrong, a negative number');
                                END IF;
                              ELSE
                              ----aici vin null-urile
                               SELECT NVL(p_parent_id,-1) INTO v_value_parent FROM DUAL;
                                INSERT INTO courses VALUES(course_seq.NEXTVAL,p_parent_id,p_course_content,p_description_course,p_course_name,p_image_path_download,p_course_video_path);
                                  COMMIT;
                                 SELECT course_seq.CURRVAL INTO v_number_id FROM DUAL;
                            RETURN v_number_id;
                             END IF;
                          
                         EXCEPTION WHEN others THEN
                                raise_application_error(-20001,'We failed to insert a new Course!');
                         END create_course;
                         
                         
             
              FUNCTION update_course (p_id_curs INT,p_parent_id courses.parent_id%TYPE,      p_course_content courses.course_content%TYPE,
                        p_description_course courses.description_course%TYPE,       p_course_name courses.course_name%TYPE,
                        p_image_path_download courses.image_path_download%TYPE,     p_course_video_path courses.course_video_path%TYPE) RETURN INT IS
                 v_parent_id INT;
                PRAGMA AUTONOMOUS_TRANSACTION;
        BEGIN
             IF (p_parent_id>0) OR (p_parent_id<=0) THEN
    ---HERE WE HAVE THE NUMBERS
        IF(p_parent_id<=0) THEN
            raise_application_error(-20001,'The parent id given is negative');
        ELSE
            SELECT NVL(parent_id,-1) INTO v_parent_id FROM courses WHERE id_curs=p_parent_id;---if the parent is invalid then we won't find anyone and we'll get an expception
            ---IF IT'S NEGATIVE WE KNOW THERE WAS NULL OTHERWISE NO
            IF v_parent_id = -1 THEN
                UPDATE courses SET parent_id=p_parent_id, course_content=p_course_content,description_course=p_description_course,course_name=p_course_name,image_path_download=p_image_path_download,course_video_path=p_course_video_path 
                WHERE id_curs=p_id_curs;
                COMMIT;
                RETURN 1;---DO YOUR JOB UPDATE
            ELSE
                raise_application_error(-20001,'We have a wrong parent candidate');
            END IF;
        END IF;
    ELSE
    ----HERE WE HAVE THE NULLS
   UPDATE courses SET parent_id=p_parent_id, course_content=p_course_content,description_course=p_description_course,course_name=p_course_name,image_path_download=p_image_path_download,course_video_path=p_course_video_path 
                WHERE id_curs=p_id_curs;
                COMMIT;
             RETURN 1;
            END IF;
    EXCEPTION WHEN others THEN
        raise_application_error(-20001,'Error at inserting');
    
    END update_course;
    
        FUNCTION getAllCourses RETURN base_type PIPELINED IS
        BEGIN
            FOR v_std_line IN (SELECT * FROM courses) LOOP
                PIPE ROW(v_std_line);
            END LOOP;
        EXCEPTION WHEN others THEN
        raise_application_error(-20001,'I have an error when I am trying to get all the courses');
        END getAllCourses;
        
        FUNCTION getById(p_id_curs INT) RETURN base_type PIPELINED IS
        BEGIN
            FOR v_std_line IN (SELECT * FROM courses WHERE id_curs=p_id_curs) LOOP
                PIPE ROW(v_std_line);
            END LOOP;
        EXCEPTION WHEN others THEN
        raise_application_error(-20001,'I have an error when I am trying to get a curs by Id');
        END;
END courses_package;/* STATEMENT */