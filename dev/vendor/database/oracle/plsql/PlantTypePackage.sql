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
    TYPE table_type is table of plant_type%ROWTYPE;
    
    FUNCTION add_plant_type ( plant_type_name plant_type.name%TYPE,
                              plant_type_image_link plant_type.image_link%TYPE) RETURN INT;
                        
    FUNCTION get_plant_types RETURN table_type PIPELINED;          
    
    FUNCTION get_plant_type_by_id ( id_plant_type plant_type.id%TYPE) RETURN table_type PIPELINED;
    
    FUNCTION get_plant_type_by_id_user (p_id_user base_user.id%TYPE) RETURN table_type PIPELINED;
    
END plant_type_packege;/* STATEMENT */




CREATE OR REPLACE PACKAGE BODY plant_type_packege IS

    FUNCTION add_plant_type ( plant_type_name plant_type.name%TYPE,
                              plant_type_image_link plant_type.image_link%TYPE) RETURN INT AS
                 
        v_current_plant_type_id INT; 
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
    
        INSERT INTO plant_type (id, name, image_link) VALUES (plant_type_seq.NEXTVAL, plant_type_name, plant_type_image_link); 
        COMMIT;
        
        SELECT plant_type_seq.CURRVAL INTO v_current_plant_type_id FROM DUAL;
        RETURN v_current_plant_type_id;
    END add_plant_type;         
    
    FUNCTION get_plant_types RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM plant_type;
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_plant_types;           
    
    FUNCTION get_plant_type_by_id ( id_plant_type plant_type.id%TYPE) RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM plant_type WHERE id = id_plant_type;
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_plant_type_by_id;  
    
    FUNCTION get_plant_type_by_id_user (p_id_user base_user.id%TYPE) RETURN table_type PIPELINED IS
    BEGIN
        FOR current_plant_type IN (SELECT DISTINCT p_t.* FROM plant p join plant_type p_t on p.id_type = p_t.id WHERE p.id_user =p_id_user) LOOP
            PIPE ROW(current_plant_type);
        END LOOP;
    END;

END plant_type_packege;/* STATEMENT */


SELECT plant_type_packege.get_plant_type_by_id_user(4)  FROM DUAL;

SELECT plant_type_packege.add_plant_type('Vegetables','pozaTomato.png') FROM DUAL ;
SELECT plant_type_packege.add_plant_type('Fruits','pozaCucumber.png') FROM DUAL ;
SELECT plant_type_packege.add_plant_type('Trees','pozaCartof.png') FROM DUAL ;

SELECT plant_packege.add_plant(4,3,'Pinochio') FROM DUAL;

DELETE FROM plant_type;
COMMIT;
SELECT * FROM plant_type;
