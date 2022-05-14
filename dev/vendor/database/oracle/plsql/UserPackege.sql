set serverout on;

--CREATE TABLE

DECLARE
    create_sql LONG;
BEGIN
    
    create_sql := 'CREATE TABLE base_user
    (
        id INT NOT NULL,
        role VARCHAR2(10) NOT NULL,
        name VARCHAR2(40) NOT NULL,
        email VARCHAR2(40) NOT NULL,
        password VARCHAR2(30) NOT NULL
    )';
    
    EXECUTE IMMEDIATE create_sql;
    
    EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE = -955 THEN
            return;
          ELSE
             RAISE;
          END IF;


    create_sql := 'ALTER TABLE base_user ADD 
    (
        CONSTRAINT base_user_pk PRIMARY KEY (ID)
    );';
    
    EXECUTE IMMEDIATE create_sql;

    create_sql := 'CREATE SEQUENCE base_user_seq START WITH 1;';

    EXECUTE IMMEDIATE create_sql;

    create_sql := '
        CREATE OR REPLACE TRIGGER base_user_binsr 
            BEFORE INSERT ON base_user 
                FOR EACH ROW

                    BEGIN
                        SELECT base_user_seq.NEXTVAL
                        INTO   :new.id
                        FROM   dual;
                    END;';

    EXECUTE IMMEDIATE create_sql;

END; 
/

--CREATE PACKEGE

CREATE OR REPLACE PACKAGE user_packege IS
    PROCEDURE adauga_student (nume studenti.nume%type, prenume studenti.prenume%type);
END user_packege;
/

CREATE OR REPLACE PACKAGE BODY user_packege IS

    PROCEDURE initialize IS
        DECLARE
            CURSOR create_table 
        BEGIN
            CREATE TABLE IF NOT EXISTS studenti (
              id INT NOT NULL PRIMARY KEY,
            );
            
            DBMS_OUTPUT.PUT_LINE('Created user database');
        END initialize;
    
END user_packege; 
/