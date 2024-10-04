CREATE TABLE Ranking(
    rank_id int(10),
    user_id int(10) not null,
    egg_id int(10) not null,
    rank_num int(10),
    primary key(rank_id),
    foreign key(user_id) references User(user_id),
    foreign key(egg_id) references Eggs(egg_id)
);