DROP DATABASE IF EXISTS example_db;

CREATE DATABASE example_db;

CREATE TABLE student(
   ID SERIAL PRIMARY KEY     NOT NULL,
   NAME              TEXT    NOT NULL,
   CATS              INT     NOT NULL,
   PLACE           CHAR(50)
);
