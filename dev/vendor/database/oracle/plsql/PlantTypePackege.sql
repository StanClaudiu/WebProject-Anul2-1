--CREATE TABLE

DROP SEQUENCE plant_type_seq /* STATEMENT */;

DROP TABLE plant_type CASCADE CONSTRAINTS /* STATEMENT */;


CREATE TABLE plant_type
(
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR2(40) NOT NULL,
    image_link VARCHAR2(40) NOT NULL
) /* STATEMENT */;



CREATE SEQUENCE plant_type_seq START WITH 1 /* STATEMENT */;


--CREATE PACKEGE


CREATE OR REPLACE PACKAGE plant_type_packege IS
    TYPE table_type is table of plant%ROWTYPE;
    
    FUNCTION add_plant_type ( plant_type_name plant_type.name%TYPE,
                              plant_type_image_link plant_type.image_link%TYPE) RETURN INT;
                        
    FUNCTION get_plant_types RETURN table_type PIPELINED;          
    
    FUNCTION get_plant_type_by_id ( id_plant_type plant_type.id%TYPE) RETURN table_type PIPELINED;
    
END plant_type_packege;/* STATEMENT */




CREATE OR REPLACE PACKAGE BODY plant_type_packege IS

    FUNCTION add_plant_type ( plant_type_name plant_type.name%TYPE,
                              plant_type_image_link plant_type.image_link%TYPE) RETURN INT AS
         
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
    
        INSERT INTO plant_type (id, role, name, email, password) VALUES (base_user_seq.NEXTVAL, user_role, user_name, user_email, user_password); 
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
    
END plant_type_packege;/* STATEMENT */



----DE LUAT DE AICI!!!!!DE STERS ADICA
SELECT plant_packege.get_users() FROM DUAL;


