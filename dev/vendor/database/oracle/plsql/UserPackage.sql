--CREATE TABLE

DROP SEQUENCE base_user_seq /* STATEMENT */;

DROP TABLE base_user CASCADE CONSTRAINTS /* STATEMENT */;


CREATE TABLE base_user
(
    id INT NOT NULL PRIMARY KEY,
    role VARCHAR2(10) NOT NULL,
    name VARCHAR2(40) NOT NULL,
    email VARCHAR2(40) NOT NULL,
    password VARCHAR2(80) NOT NULL
) /* STATEMENT */;



CREATE SEQUENCE base_user_seq START WITH 1 /* STATEMENT */;


--CREATE PACKEGE


CREATE OR REPLACE PACKAGE user_packege IS
    TYPE table_type is table of base_user%ROWTYPE;
    
    FUNCTION add_user ( user_role base_user.role%TYPE, 
                        user_name base_user.name%TYPE,
                        user_email base_user.email%TYPE,
                        user_password base_user.password%TYPE) RETURN INT;
                        
    FUNCTION get_users RETURN table_type PIPELINED;          
    
    FUNCTION get_user_by_id ( user_id base_user.id%type) RETURN table_type PIPELINED;
    
    FUNCTION get_user_by_email ( user_email base_user.email%type) RETURN table_type PIPELINED;
END user_packege;/* STATEMENT */




CREATE OR REPLACE PACKAGE BODY user_packege IS

    FUNCTION add_user ( user_role base_user.role%type, 
                        user_name base_user.name%type,
                        user_email base_user.email%type,
                        user_password base_user.password%type) RETURN INT AS
         
        CURSOR same_email_users IS SELECT email FROM base_user WHERE email = user_email;
        v_aux base_user.email%type;
        v_current_user_id INT; 
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
        OPEN same_email_users;
        FETCH same_email_users INTO v_aux;      
        
        IF (same_email_users%NOTFOUND = FALSE)
        THEN
            raise_application_error(-20001, 'Already used email');
        END IF;
        
        INSERT INTO base_user (id, role, name, email, password) VALUES (base_user_seq.NEXTVAL, user_role, user_name, user_email, user_password); 
        COMMIT;
        
        SELECT base_user_seq.CURRVAL INTO v_current_user_id FROM DUAL;
        RETURN v_current_user_id;
    END add_user;         
    
    FUNCTION get_users RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM base_user;
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_users;          
    
    FUNCTION get_user_by_id ( user_id base_user.id%TYPE) RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM base_user WHERE id = user_id; 
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_user_by_id;   
    
    FUNCTION get_user_by_email ( user_email base_user.email%TYPE) RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM base_user WHERE email = user_email;
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_user_by_email;  
    
END user_packege;/* STATEMENT */


