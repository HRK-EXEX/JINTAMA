CREATE TABLE InitState(
    pattern_id int(10),
    skill_id int(10) NOT NULL,
    score int(10) NOT NULL,
    hp int(10) NOT NULL,
    charm int(10) NOT NULL,
    sense int(10) NOT NULL,
    img varchar(100) NOT NULL,
    PRIMARY KEY (pattern_id),
    FOREIGN KEY (skill_id) REFERENCES Skills (skill_id)
);


INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,1,10,10,1,19,'bakemon.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,2,10,7,16,17,'fukurou.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,3,10,12,9,9,'ikari.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,4,10,10,10,10,'kaeru.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,5,10,15,10,5,'koara.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,6,10,5,10,15,'melondog.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,7,10,7,15,8,'obake.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,8,10,5,10,15,'obebu.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,9,10,18,8,4,'takugorira.png');
INSERT INTO `InitState`(`pattern_id`, `skill_id`, `score`, `hp`, `charm`, `sense`, `img`) VALUES (null,10,10,6,11,14,'kaba.png');
