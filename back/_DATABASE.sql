drop table IF EXISTS PLAYERS_MATCHES;
drop table IF EXISTS PLAYERS;
drop table IF EXISTS MATCHES;

create table IF NOT EXISTS PLAYERS  (
account_id bigint unsigned,
personaname text,
avatarfull text,
loccountrycode varchar(2) ,
primary key(account_id)
)CHARACTER SET utf8 COLLATE utf8_general_ci;

create table IF NOT EXISTS MATCHES  (
match_id bigint unsigned,
start_time bigint unsigned,
cluster varchar(20) ,
dire_score int unsigned,
radiant_score int unsigned,
duration MEDIUMINT,
primary key(match_id)
)CHARACTER SET utf8 COLLATE utf8_general_ci;

create table IF NOT EXISTS PLAYERS_MATCHES  (
account_id  bigint unsigned,
match_id  bigint unsigned,
assists int unsigned,
deaths int unsigned,
denies int unsigned,
gold_per_min int unsigned,
hero_damage int unsigned,
hero_healing int unsigned,
kills int unsigned,
last_hits int unsigned,
net_worth int unsigned,
tower_damage int unsigned,
xp_per_min int unsigned,
win tinyint unsigned,
ability_0 int unsigned,
ability_1 int unsigned,
ability_2 int unsigned,
ability_3 int unsigned,
Hero_level int unsigned,
team int unsigned,
leaver_status int unsigned,
aghanims_scepter int unsigned,
aghanims_shard int unsigned,
backpack_0 int unsigned,
backpack_1 int unsigned,
backpack_2 int unsigned,
item_0 int unsigned,
item_1 int unsigned,
item_2 int unsigned,
item_3 int unsigned,
item_4 int unsigned,
item_5 int unsigned,
item_neutral int unsigned,
moonshard int unsigned,
hero_id int unsigned,
player_slot int unsigned,
primary key(account_id,match_id)
)CHARACTER SET utf8 COLLATE utf8_general_ci;

alter table PLAYERS_MATCHES add foreign key(account_id) references PLAYERS(account_id) ON DELETE CASCADE;
alter table PLAYERS_MATCHES add foreign key(match_id) references MATCHES(match_id) ON DELETE CASCADE;
