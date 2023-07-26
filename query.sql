CREATE DATABASE course_shop;

CREATE TABLE users(
user_uid UUID NOT NULL PRIMARY KEY,
email VARCHAR(100) NOT NULL,
password VARCHAR(150) NOT NULL,
is_admin BOOLEAN,
UNIQUE(user_uid),UNIQUE(email)
);

CREATE TABLE courses(
  course_uid UUID NOT NULL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description VARCHAR(500) NOT NULL,
  price  NUMERIC NOT NULL ,
  off NUMERIC DEFAULT 0 ,
  public_status BOOLEAN,
  user_uid UUID REFERENCES users(user_uid)
);

CREATE TABLE comments(
  comment_uid UUID NOT NULL PRIMARY KEY,
  comment VARCHAR(1000) NOT NULL , 
  reply VARCHAR(1000),
  public_status BOOLEAN DEFAULT false,
  course_uid UUID REFERENCES courses(course_uid) NOT NULL,
  user_uid UUID REFERENCES users(user_uid) NOT NULL
);
