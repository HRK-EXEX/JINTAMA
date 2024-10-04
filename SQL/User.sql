CREATE TABLE User (
    user_id int(10) not null unique,
    user_name varchar(20) not null,
    password varchar(128) not null,
    primary key(user_id)
    
);


