CREATE TABLE Eggs (
    egg_id int(10) AUTO_INCREMENT,
    user_id int(10) not null,
    score int(10) not null,
    hp int (10) not null,
    charm int(10) not null,
    sense int(10) not null,
    img varchar(100),
    primary key(egg_id),
    foreign key (user_id) references User(user_id)
);