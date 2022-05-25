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
        TYPE table_type IS TABLE OF started_courses%ROWTYPE;
        
        FUNCTION create_started_course (id_user started_courses.id_user%TYPE,
                                        id_curs started_courses.id_curs%TYPE) RETURN INT;
        FUNCTION update_started_course (id_stat started_courses.id_curs%TYPE,
                                        p_progress started_courses.id_curs%TYPE) RETURN INT;
        FUNCTION getAllStartedCourses(p_id_user started_courses.id_user%TYPE) 
                                                                        RETURN table_type PIPELINED;
        
    END started_courses_package /* STATEMENT */ ;
    
   
         
                                        
    set serveroutput on;
    
    CREATE OR REPLACE PACKAGE BODY started_courses_package IS
        
        
         FUNCTION create_started_course (id_user started_courses.id_user%TYPE,
                                        id_curs started_courses.id_curs%TYPE) RETURN INT AS      
            PRAGMA AUTONOMOUS_TRANSACTION;
            id_val_stat INT;    
         BEGIN
            INSERT INTO started_courses VALUES(started_courses_seq.NEXTVAL,id_user,id_curs,0);
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
        
        FUNCTION getAllStartedCourses(p_id_user started_courses.id_user%TYPE) RETURN table_type PIPELINED IS
            CURSOR table_started_courses IS SELECT * FROM started_courses WHERE started_courses.id_user = p_id_user; 
        BEGIN
            FOR current_course IN table_started_courses LOOP
                PIPE ROW(current_course);
            END LOOP;
        END;
        
  END started_courses_package /* STATEMENT */;

---MY TESTS
ROLLBACK;
INSERT INTO started_courses VALUES(1,1,1,0.2);--ID , ID_USER , ID_CURS , PROCENTAJ
INSERT INTO started_courses VALUES(2,1,2,0.2);

SELECT started_courses_package.update_started_course(1,2) FROM DUAL;
SELECT started_courses_package.create_started_course(1,3) FROM DUAL;
SELECT started_courses_package.getAllStartedCourses(2) FROM DUAL;
SELECT * FROM started_courses;