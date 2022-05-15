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
    FUNCTION add_user ( user_role base_user.role%type, 
                        user_name base_user.name%type,
                        user_email base_user.email%type,
                        user_password base_user.password%type) RETURN INT;
END user_packege;
/

CREATE OR REPLACE PACKAGE BODY user_packege IS

    FUNCTION add_user ( user_role base_user.role%type, 
                        user_name base_user.name%type,
                        user_email base_user.email%type,
                        user_password base_user.password%type) RETURN INT AS
         
        CURSOR same_email_users IS SELECT email FROM base_user WHERE email = user_email;
        insert_sql LONG;
        v_aux base_user.email%type;
    BEGIN
        OPEN same_email_users;
        FETCH same_email_users INTO v_aux;      
        
        IF (same_email_users%NOTFOUND = FALSE)
        THEN
            raise_application_error(-20001, 'Already used email');
        END IF;
        
        insert_sql := 'INSERT INTO base_user (role, name, email, password) VALUES (';
        --|| user_role || ',' || user_name || ',' || user_email || ',' || user_password || ')';
        
        DBMS_OUTPUT.PUT_LINE(insert_sql);
        
        --EXECUTE IMMEDIATE insert_sql;
        
        RETURN 1;
    END add_user;                
    
END user_packege; 
/

set serverout on;

SELECT user_packege.add_user('Becali', 'Gigi', 'ra', 'da') FROM DUAL;