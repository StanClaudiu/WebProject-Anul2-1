CREATE OR REPLACE PACKAGE reminder_packege IS
    TYPE table_type is table of varchar2 (4000);
    
    FUNCTION split_string (
      delimited_string varchar2,
      separator        varchar2 default ','
    ) RETURN string_table
      PIPELINED;
END reminder_packege;/* STATEMENT */



CREATE OR REPLACE PACKAGE BODY reminder_packege IS
    FUNCTION split_string (
      delimited_string varchar2,
      separator        varchar2 default ','
    ) RETURN string_table
      PIPELINED
    AS
      delimited_string_cleaned varchar2(32767);
      substring varchar2(4000);
      pos       pls_integer;
    BEGIN
      delimited_string_cleaned := 
        trim ( both separator from delimited_string ) || 
        separator;
      pos := instr ( delimited_string_cleaned, separator );
      substring := substr ( delimited_string_cleaned, 1, pos - 1 );
      
      loop
        exit when substring is null;
        pipe row ( substring );
      
        substring := substr ( 
          delimited_string_cleaned, 
          pos + 1, 
          instr ( 
            delimited_string_cleaned, separator, pos + 1 
          ) - pos - 1 
        );
        pos := instr ( delimited_string_cleaned, separator, pos + 1 );   
      end loop;
    
      return;
    END;
END reminder_packege;/* STATEMENT */

