USE paraglidingapp;usersusers

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(16) NOT NULL,
    name VARCHAR(30) NOT NULL,
    birthdate DATE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE launch_sites (
    userId VARCHAR(10) NOT NULL PRIMARY KEY,
    userName VARCHAR(20) NOT NULL
);

CREATE TABLE posts (
    postNum INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    content TEXT NOT NULL,
    image VARCHAR(255)
);