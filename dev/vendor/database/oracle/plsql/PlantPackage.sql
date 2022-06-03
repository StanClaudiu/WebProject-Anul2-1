--CREATE TABLE

DROP SEQUENCE plant_seq /* STATEMENT */;

DROP TABLE plant CASCADE CONSTRAINTS /* STATEMENT */;


CREATE TABLE plant
(
    id INT NOT NULL PRIMARY KEY,
    id_user INT NOT NULL,
    id_type INT NOT NULL,  
    CONSTRAINT fk_plant_to_user
        FOREIGN KEY (id_user)
        REFERENCES base_user(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_plant_to_type
        FOREIGN KEY (id_type)
        REFERENCES plant_type(id)
        ON DELETE CASCADE,
    name VARCHAR2(40) NOT NULL
) /* STATEMENT */;



CREATE SEQUENCE plant_seq START WITH 1 /* STATEMENT */;


--CREATE PACKEGE


CREATE OR REPLACE PACKAGE plant_packege IS
    TYPE table_type is table of plant%ROWTYPE;
    
    FUNCTION add_plant ( id_user plant.id_user%TYPE, 
                         id_type plant.id_type%TYPE,
                         plant_name plant.name%TYPE) RETURN INT;
                        
    FUNCTION get_plants RETURN table_type PIPELINED;          
    
    FUNCTION get_plant_by_id ( id_plant plant.id%TYPE) RETURN table_type PIPELINED;
    
    FUNCTION get_plants_by_user_id ( id_user plant.id_user%TYPE) RETURN table_type PIPELINED;
    
    FUNCTION get_plants_by_user_and_type_id ( p_id_user plant.id_user%TYPE, p_id_type plant_type.id%TYPE ) RETURN table_type PIPELINED;

    FUNCTION delete_plant_by_id ( id_plant plant.id%TYPE) RETURN INT;
END plant_packege;/* STATEMENT */




CREATE OR REPLACE PACKAGE BODY plant_packege IS

    FUNCTION add_plant ( id_user plant.id_user%TYPE, 
                         id_type plant.id_type%TYPE,
                         plant_name plant.name%TYPE) RETURN INT AS
         
        v_current_plant_id INT; 
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
        
        INSERT INTO plant (id, id_user, id_type, name) VALUES (plant_seq.NEXTVAL, id_user, id_type, plant_name); 
        COMMIT;
        
        SELECT plant_seq.CURRVAL INTO v_current_plant_id FROM DUAL;
        RETURN v_current_plant_id;
    END add_plant;         
    
    FUNCTION get_plants RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM plant;
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_plants;          
    
    FUNCTION get_plant_by_id ( id_plant plant.id%TYPE) RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM plant WHERE id = id_plant; 
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_plant_by_id;   
    
    FUNCTION get_plants_by_user_id ( id_user plant.id_user%TYPE) RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM plant WHERE id_user = id_user;
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_plants_by_user_id;  
    
    FUNCTION delete_plant_by_id ( id_plant plant.id%TYPE) RETURN INT AS
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
        
        DELETE FROM plant WHERE id = id_plant;
        COMMIT;
        
        RETURN 1;
    END delete_plant_by_id;   
    
    FUNCTION get_plants_by_user_and_type_id ( p_id_user plant.id_user%TYPE, p_id_type plant_type.id%TYPE ) RETURN table_type PIPELINED IS
    BEGIN
        FOR v_rand IN (SELECT plant.* FROM plant join plant_type on plant.id_type = plant_type.id WHERE plant.id_type = p_id_type AND plant.id_user = p_id_user) LOOP
            PIPE ROW(v_rand);
        END LOOP;
    END;

    
END plant_packege;/* STATEMENT */


SELECT * FROM plant;

SELECT plant_packege.get_plants_by_user_and_type_id(4,3) FROM DUAL;

SELECT plant_packege.add_plant(1,1,"Tomato")FROM DUAL; 
 
