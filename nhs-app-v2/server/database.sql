CREATE DATABASE jwttutorial;


--set extension
--get into the table and 
--create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--Insert fake users
INSERT INTO users (user_name, user_email, user_password) 
VALUES ('eric', 'email@email.com', 'password5432');