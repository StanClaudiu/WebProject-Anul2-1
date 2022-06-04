--CREATE TABLE

DROP SEQUENCE reminder_seq /* STATEMENT */;

DROP TABLE reminder CASCADE CONSTRAINTS /* STATEMENT */;


CREATE TABLE reminder
(
    id INT NOT NULL PRIMARY KEY,
    id_plant INT NOT NULL,  
    CONSTRAINT fk_plant
        FOREIGN KEY (id_plant)
        REFERENCES plant(id)
        ON DELETE CASCADE,
        
    content VARCHAR2(40) NOT NULL
) /* STATEMENT */;



CREATE SEQUENCE reminder_seq START WITH 1 /* STATEMENT */;


--CREATE PACKEGE


CREATE OR REPLACE PACKAGE reminder_packege IS
    TYPE table_type is table of reminder%ROWTYPE;
    
    FUNCTION add_reminder (id_plant reminder.id_plant %type, content reminder.content %type ) RETURN INT;       
    
    FUNCTION get_all_user_reminders (user_id base_user.id %type) RETURN table_type PIPELINED;
        
    FUNCTION delete_reminder_by_id (id_reminder reminder.id %type) RETURN INT; 
    
    FUNCTION get_reminder_by_id ( id_reminder reminder.id%TYPE) RETURN table_type PIPELINED;
    
    END reminder_packege;/* STATEMENT */




CREATE OR REPLACE PACKAGE BODY reminder_packege IS

    FUNCTION add_reminder (id_plant reminder.id_plant %type, content reminder.content %type ) RETURN INT AS
    

        v_current_reminder_id INT; 
        PRAGMA AUTONOMOUS_TRANSACTION;
        
    BEGIN
        INSERT INTO reminder (id, id_plant, content) VALUES (reminder_seq.NEXTVAL, id_plant, content); 
        COMMIT;
        
        SELECT reminder_seq.CURRVAL INTO v_current_reminder_id FROM DUAL;
        RETURN v_current_reminder_id;
    END add_reminder; 
    
    
    FUNCTION get_all_user_reminders (user_id base_user.id %type) RETURN table_type PIPELINED AS
    BEGIN
        FOR current_record IN (SELECT reminder.* FROM reminder join plant on reminder.id_plant = plant.id WHERE plant.id_user = user_id) LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_all_user_reminders ; 
    
    
      FUNCTION delete_reminder_by_id ( id_reminder reminder.id%TYPE) RETURN INT AS
        PRAGMA AUTONOMOUS_TRANSACTION;
    BEGIN
        
        DELETE FROM reminder WHERE id = id_reminder;
        COMMIT;
        RETURN 1;
    END delete_reminder_by_id; 
    
      FUNCTION get_reminder_by_id ( id_reminder reminder.id%TYPE) RETURN table_type PIPELINED AS
        CURSOR table_cursor IS SELECT * FROM reminder WHERE id = id_reminder; 
    BEGIN
        FOR current_record IN table_cursor LOOP
            PIPE ROW(current_record);
        END LOOP;
    END get_reminder_by_id;   
    

    
END reminder_packege;/* STATEMENT */