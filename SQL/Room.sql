CREATE TABLE Room(
    room_id int(10),
    room_name varchar(20) not null,
    room_user1 int(10) unique,
    room_user2 int(10) unique,
    room_user3 int(10) unique,
    room_user4 int(10) unique,
    primary key(room_id),
    foreign key(room_user1)  references User(user_id),
    foreign key(room_user2)  references User(user_id),
    foreign key(room_user3)  references User(user_id),
    foreign key(room_user4)  references User(user_id)
);