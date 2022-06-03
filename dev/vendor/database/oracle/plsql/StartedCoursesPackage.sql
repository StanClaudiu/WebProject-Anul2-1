----cream cursurile

DROP SEQUENCE started_courses_seq /* STATEMENT */;

DROP TABLE started_courses CASCADE CONSTRAINTS /* STATEMENT */;

CREATE TABLE started_courses
(
    id_statistics INT PRIMARY KEY,
    id_user INT NOT NULL,
    id_curs INT NOT NULL,
    progress FLOAT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (id_user)
        REFERENCES base_user(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_couse
        FOREIGN KEY (id_curs)
        REFERENCES courses(id_curs)
        ON DELETE CASCADE,
    CONSTRAINT unq_learning UNIQUE (id_user,id_curs)
) /* STATEMENT */;

CREATE SEQUENCE started_courses_seq START WITH 1/* STATEMENT */;


-----let's make the package

CREATE OR REPLACE PACKAGE started_courses_package IS
    
    CURSOR table_for_return_allCourses IS SELECT c.*, sc.id_statistics , sc.id_user , sc.progress FROM started_courses sc RIGHT JOIN courses c on sc.id_curs=c.id_curs; 
    ----this is just for the type
    
    TYPE preview_courses_table IS TABLE OF table_for_return_allCourses%ROWTYPE;
    
    FUNCTION create_started_course (p_id_user started_courses.id_user%TYPE,
                                    p_id_curs started_courses.id_curs%TYPE) RETURN INT ;
    FUNCTION update_started_course (id_stat started_courses.id_curs%TYPE,
                                    p_progress started_courses.id_curs%TYPE) RETURN INT;
    FUNCTION getAllStartedCourses(p_id_user started_courses.id_user%TYPE) 
                                                                    RETURN preview_courses_table PIPELINED;          
    FUNCTION getByUserAndCourse(p_id_user started_courses.id_user%TYPE,
                                p_id_course started_courses.id_curs%TYPE) 
                                                                    RETURN preview_courses_table PIPELINED;
    
END started_courses_package;/* STATEMENT */

         

CREATE OR REPLACE PACKAGE BODY started_courses_package IS
    
    
     FUNCTION create_started_course (p_id_user started_courses.id_user%TYPE,
                                    p_id_curs started_courses.id_curs%TYPE) RETURN INT AS      
        PRAGMA AUTONOMOUS_TRANSACTION;
        id_val_stat INT;    
     BEGIN
        INSERT INTO started_courses VALUES(started_courses_seq.NEXTVAL,p_id_user,p_id_curs,5);
        COMMIT;
        SELECT started_courses_seq.CURRVAL INTO id_val_stat FROM DUAL;
        RETURN id_val_stat;
     EXCEPTION 
        WHEN others THEN
            RAISE_APPLICATION_ERROR(-20000, 'ERROR IN INSERTING A NEW COURSE PROGRESS IN DB!');
            RETURN -1;
     END create_started_course;
     
     FUNCTION update_started_course (id_stat started_courses.id_curs%TYPE,
                                    p_progress started_courses.id_curs%TYPE) RETURN INT IS
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
        IF(p_progress>=0 AND p_progress<=1)THEN
        UPDATE started_courses  SET progress=p_progress WHERE started_courses.id_statistics = id_stat; 
        COMMIT;
        RETURN 1;
        ELSE
                RAISE_APPLICATION_ERROR(-20002,'Something is not good,give me to the catcher');
        RETURN -1;
        END IF;
        
    EXCEPTION WHEN others THEN
    RAISE_APPLICATION_ERROR(-20001,'ERROR UPDATING A STARTED COURSE PROGRESS');
        RETURN -1;
    END update_started_course;
    
    FUNCTION getAllStartedCourses(p_id_user started_courses.id_user%TYPE) RETURN preview_courses_table PIPELINED IS
        CURSOR table_started_courses IS SELECT c.*, sc.id_statistics , sc.id_user , sc.progress 
        FROM started_courses sc RIGHT JOIN courses c on sc.id_curs=c.id_curs where id_user=p_id_user OR (NVL(id_user,-1)=-1 AND NVL(c.parent_id,-1)=-1);
    BEGIN
        FOR current_course IN table_started_courses LOOP
            PIPE ROW(current_course);
        END LOOP;
    END;
    
    FUNCTION getByUserAndCourse(p_id_user started_courses.id_user%TYPE,
                                p_id_course started_courses.id_curs%TYPE) RETURN preview_courses_table PIPELINED IS
                                
        CURSOR table_cursor IS SELECT c.*, sc.id_statistics , sc.id_user,  sc.progress
        FROM started_courses sc RIGHT JOIN courses c on sc.id_curs=c.id_curs where id_user=p_id_user AND sc.id_curs=p_id_course;
    BEGIN
        FOR current_course IN table_cursor LOOP
            PIPE ROW(current_course);
        END LOOP;
    END;
    
END started_courses_package;/* STATEMENT */