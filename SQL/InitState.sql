CREATE TABLE InitState(
    pattern_id int(10),
    skill_id int(10) NOT NULL,
    score int(10) NOT NULL,
    hp int(10) NOT NULL,
    charm int(10) NOT NULL,
    sense int(10) NOT NULL,
    PRIMARY KEY (pattern_id),
    FOREIGN KEY (skill_id) REFERENCES Skills (skill_id)
);