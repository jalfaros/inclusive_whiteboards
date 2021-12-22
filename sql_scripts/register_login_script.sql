CREATE DATABASE inclusive_whiteboards;


CREATE TABLE user_login (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    username varchar(20) not null,
    password varchar(100) not null,
    registeredTime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
)




CREATE TABLE user_details (
    id INT NOT NULL PRIMARY KEY,
    firstName varchar(20) not null,
    secondName varchar(20),
    lastName varchar(20) not null,
    FOREIGN KEY (id) REFERENCES user_login(id)
)
